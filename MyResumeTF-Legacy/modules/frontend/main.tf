resource "tls_private_key" "web_key" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_file" "web_key" {
  filename        = local.key_name
  content         = tls_private_key.web_key.private_key_pem
  file_permission = "0600"
}

resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location
  tags     = local.common_tags
}

resource "azurerm_virtual_network" "vnet" {
  name                = local.vnet_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = [var.vnet_cidr]
  tags                = local.common_tags
}

resource "azurerm_subnet" "web_subnet" {
  name                 = local.subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [local.web_subnet_cidr]
}

resource "azurerm_network_interface" "web_nic" {
  name                = local.web_nic_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  tags                = local.common_tags
  
  ip_configuration {
    name                          = local.web_ip_name
	  subnet_id                     = azurerm_subnet.web_subnet.id
	  private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_security_group" "web_nsg" {
  name                = local.web_nsg_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  tags                = local.common_tags
  
  security_rule {
    name                       = "Allow-HTTP-Any"
	  priority                   = 100
	  direction                  = "Inbound"
	  access                     = "Allow"
	  protocol                   = "Tcp"
	  source_port_range          = "*"
	  destination_port_range     = "80"
	  source_address_prefix      = "*"
	  destination_address_prefix = "*"
  }
  
  security_rule {
    name                       = "Allow-HTTPS-Any"
	  priority                   = 110
	  direction                  = "Inbound"
	  access                     = "Allow"
	  protocol                   = "Tcp"
	  source_port_range          = "*"
	  destination_port_range     = "443"
	  source_address_prefix      = "*"
	  destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Allow-SSH-Any"
	  priority                   = 120
	  direction                  = "Inbound"
	  access                     = "Allow"
	  protocol                   = "Tcp"
	  source_port_range          = "*"
	  destination_port_range     = "22"
	  source_address_prefix      = "*"
	  destination_address_prefix = "*"
  }  
}

resource "azurerm_network_interface_security_group_association" "web_nsg_assoc" {
  network_interface_id      = azurerm_network_interface.web_nic.id
  network_security_group_id = azurerm_network_security_group.web_nsg.id
}

resource "azurerm_linux_virtual_machine" "web_vm" {
  name = local.web_vm_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  size                = "Standard_D2s_v3"
  admin_username      = "azureuser"
  tags                = local.common_tags
  
  network_interface_ids = [
    azurerm_network_interface.web_nic.id
  ]
  
  custom_data = base64encode(templatefile("${path.module}/web_nginx_init.yaml", {
    internal_lb_ip = var.internal_lb_ip
	
    nginx_config   = templatefile("${path.module}/nginx-myresume.conf.tpl", {
        internal_lb_ip = var.internal_lb_ip
      })
    
      ssl_cert     = file("${path.module}/cloudflare_cert.pem")
      ssl_key      = file("${path.module}/cloudflare_key.pem")
      download_url = var.download_url
  }))
  
  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }
  
  admin_ssh_key {
    username = "azureuser"
	public_key = tls_private_key.web_key.public_key_openssh
  }
  
  os_disk {
    caching = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}

resource "azurerm_public_ip" "bastion_pip" {
  name                = local.web_bastion_pip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = local.common_tags
}

resource "azurerm_subnet" "bastion_subnet" {
  name                 = "AzureBastionSubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 8, 1)]
}

resource "azurerm_bastion_host" "web_bastion" {
  name                = local.web_bastion_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"   # use Standard SKU

  ip_configuration {
    name                 = local.web_bastion_ipconfig_name
    subnet_id            = azurerm_subnet.bastion_subnet.id
    public_ip_address_id = azurerm_public_ip.bastion_pip.id
  }
}

resource "azurerm_public_ip" "lb_pip" {
  name                = local.public_lb_ip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = local.common_tags
}

resource "azurerm_lb" "public_lb" {
  name                = local.public_lb_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"

  frontend_ip_configuration {
    name                 = local.lb_frontend_name
    public_ip_address_id = azurerm_public_ip.lb_pip.id
  }
}

resource "azurerm_lb_backend_address_pool" "public_lb_pool" {
  loadbalancer_id = azurerm_lb.public_lb.id
  name            = local.lb_pool_name
}

resource "azurerm_lb_probe" "public_lb_probe" {
  loadbalancer_id     = azurerm_lb.public_lb.id
  name                = local.lb_health_probe
  protocol            = "Tcp"
  port                = 443
  interval_in_seconds = 5
  number_of_probes    = 2
}

resource "azurerm_lb_rule" "public_lb_rule_https" {
  loadbalancer_id                = azurerm_lb.public_lb.id
  name                           = local.lb_rule
  protocol                       = "Tcp"
  frontend_port                  = 443
  backend_port                   = 443
  frontend_ip_configuration_name = local.lb_frontend_name
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.public_lb_pool.id]
  probe_id                       = azurerm_lb_probe.public_lb_probe.id
}

resource "azurerm_network_interface_backend_address_pool_association" "web_nic_to_pool" {
  network_interface_id    = azurerm_network_interface.web_nic.id
  ip_configuration_name   = local.web_ip_name
  backend_address_pool_id = azurerm_lb_backend_address_pool.public_lb_pool.id
}