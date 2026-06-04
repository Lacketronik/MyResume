resource "tls_private_key" "app_key" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_file" "app_key" {
  filename        = local.app_key_name
  content         = tls_private_key.app_key.private_key_pem
  file_permission = "0600"
}

resource "tls_private_key" "db_key" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_file" "db_key" {
  filename        = local.db_key_name
  content         = tls_private_key.db_key.private_key_pem
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

resource "azurerm_subnet" "app_subnet" {
  name                 = local.app_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [local.app_subnet_cidr]
}

resource "azurerm_subnet" "db_subnet" {
  name                 = local.db_subnet_name
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [local.db_subnet_cidr]
}

resource "azurerm_nat_gateway" "nat" {
  name                = local.nat_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Standard"
}

resource "azurerm_public_ip" "nat_pip" {
  name                = local.nat_pip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_nat_gateway_public_ip_association" "nat_pip_associate" {
  nat_gateway_id       = azurerm_nat_gateway.nat.id
  public_ip_address_id = azurerm_public_ip.nat_pip.id
}

resource "azurerm_subnet_nat_gateway_association" "nat_app_associate" {
  subnet_id      = azurerm_subnet.app_subnet.id
  nat_gateway_id = azurerm_nat_gateway.nat.id
}

resource "azurerm_subnet_nat_gateway_association" "db_db_associate" {
  subnet_id      = azurerm_subnet.db_subnet.id
  nat_gateway_id = azurerm_nat_gateway.nat.id
}

resource "azurerm_network_interface" "app_nic" {
  name                = local.app_nic_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  tags                = local.common_tags
  
  ip_configuration {
    name                          = local.app_ip_name
	  subnet_id                     = azurerm_subnet.app_subnet.id
	  private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_interface" "db_nic" {
  name                = local.db_nic_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  tags                = local.common_tags
  
  ip_configuration {
    name                          = local.db_ip_name
	  subnet_id                     = azurerm_subnet.db_subnet.id
	  private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_security_group" "app_nsg" {
  name                = local.app_nsg_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  tags                = local.common_tags
  
  security_rule {
    name                       = "Allow-5000-Any"
	  priority                   = 100
	  direction                  = "Inbound"
	  access                     = "Allow"
	  protocol                   = "Tcp"
	  source_port_range          = "*"
	  destination_port_range     = "5000"
	  source_address_prefix      = local.app_subnet_cidr
	  destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface_security_group_association" "app_nsg_assoc" {
  network_interface_id      = azurerm_network_interface.app_nic.id
  network_security_group_id = azurerm_network_security_group.app_nsg.id
}

resource "azurerm_linux_virtual_machine" "app_vm" {
  name = local.app_vm_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  size                = "Standard_D2s_v3"
  admin_username      = "azureuser"
  tags                = local.common_tags
  
  network_interface_ids = [
    azurerm_network_interface.app_nic.id
  ]
  
  custom_data = base64encode(templatefile("${path.module}/app_service_init.yaml", {
    download_url = var.download_url
    sql_admin_password  = var.sql_password
    db_vm_ip            = azurerm_network_interface.db_nic.private_ip_address
  }))
  
  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }
  
  admin_ssh_key {
    username = "azureuser"
	  public_key = tls_private_key.app_key.public_key_openssh
  }
  
  os_disk {
    caching = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}

resource "azurerm_linux_virtual_machine" "db_vm" {
  name = local.db_vm_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  size                = "Standard_D2s_v3"
  admin_username      = "azureuser"
  tags                = local.common_tags
  
  network_interface_ids = [
    azurerm_network_interface.db_nic.id
  ]
  
  custom_data = base64encode(templatefile("${path.module}/db_mssql_init.yaml", {
    db_migration_script = file("${path.module}/myresume_migration.sql")
    sql_admin_password  = var.sql_password
  }))
  
  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }
    
  admin_ssh_key {
    username = "azureuser"
	  public_key = tls_private_key.db_key.public_key_openssh
  }
  
  os_disk {
    caching = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}

resource "azurerm_public_ip" "backend_bastion_pip" {
  name                = local.backend_bastion_pip_name
  location            = var.location
  resource_group_name  = azurerm_resource_group.rg.name
  allocation_method    = "Static"
  sku                  = "Standard"
}

resource "azurerm_subnet" "bastion_subnet" {
  name                 = "AzureBastionSubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [cidrsubnet(var.vnet_cidr, 8, 5)]
}

resource "azurerm_bastion_host" "backend_bastion" {
  name                = local.backend_bastion_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"

  ip_configuration {
    name                 = local.backend_bastion_ipconfig_name
    subnet_id            = azurerm_subnet.bastion_subnet.id
    public_ip_address_id = azurerm_public_ip.backend_bastion_pip.id
  }
}

resource "azurerm_lb" "internal_lb" {
  name                = local.internal_lb_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"

  frontend_ip_configuration {
    name                          = local.lb_frontend_name
    subnet_id                     = azurerm_subnet.app_subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_lb_backend_address_pool" "internal_lb_pool" {
  loadbalancer_id = azurerm_lb.internal_lb.id
  name            = local.lb_pool_name
}

resource "azurerm_lb_probe" "lb_health_probe" {
  loadbalancer_id = azurerm_lb.internal_lb.id
  name            = local.lb_health_probe
  port            = 5000
}

resource "azurerm_lb_rule" "lb_rule" {
  loadbalancer_id                = azurerm_lb.internal_lb.id
  name                           = local.lb_rule
  protocol                       = "Tcp"
  frontend_port                  = 5000
  backend_port                   = 5000
  disable_outbound_snat          = true
  frontend_ip_configuration_name = local.lb_frontend_name
  probe_id                       = azurerm_lb_probe.lb_health_probe.id
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.internal_lb_pool.id]
}

resource "azurerm_network_interface_backend_address_pool_association" "app_nic_to_pool" {
  network_interface_id    = azurerm_network_interface.app_nic.id
  ip_configuration_name   = local.app_ip_name
  backend_address_pool_id = azurerm_lb_backend_address_pool.internal_lb_pool.id
}