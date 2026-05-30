locals {
  prefix = "myresume-web"
  
  key_name                  = "${path.root}/web_key.pem"
  vnet_name                 = "${local.prefix}-vnet"
  subnet_name               = "${local.prefix}-subnet"
  web_subnet_cidr           = cidrsubnet(var.vnet_cidr, 8, 0)
  web_nic_name              = "${local.prefix}-nic"
  web_ip_name               = "${local.prefix}-ip"
  web_nsg_name              = "${local.prefix}-nsg"
  web_vm_name               = "${local.prefix}-vm"
  web_bastion_pip_name      = "${local.prefix}-bastion-pip"
  web_bastion_subnet_name   = "${local.prefix}-bastion-subnet"
  web_bastion_name          = "${local.prefix}-bastion"
  web_bastion_ipconfig_name = "${local.prefix}-bastion-ipconfig"
  public_lb_ip_name         = "${local.prefix}-public-lb-pip"
  public_lb_name            = "${local.prefix}-public-lb"
  lb_frontend_name          = "${local.prefix}-public-lb-frontend-ip"
  lb_pool_name              = "${local.prefix}-lb-pool"
  lb_health_probe           = "${local.prefix}-public-lb-service-probe"
  lb_rule                   = "${local.prefix}-public-lb-rule"
  
  common_tags = {
    Project   = "MyResume"
	  Tier      = "Web"
	  ManagedBy = "Terraform"
  }
}