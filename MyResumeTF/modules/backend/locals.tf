locals {
  prefix = "myresume"
  
  app_key_name                  = "${path.root}/app_key.pem"
  db_key_name                   = "${path.root}/db_key.pem"
  vnet_name                     = "${local.prefix}-vnet"
  app_subnet_name               = "${local.prefix}-app-subnet"
  db_subnet_name                = "${local.prefix}-db-subnet"
  app_subnet_cidr               = cidrsubnet(var.vnet_cidr, 8, 3)
  db_subnet_cidr                = cidrsubnet(var.vnet_cidr, 8, 4)
  app_nic_name                  = "${local.prefix}-app-nic"
  db_nic_name                   = "${local.prefix}-db-nic"
  app_nsg_name                  = "${local.prefix}-app-nsg"
  nat_pip_name                  = "${local.prefix}-nat-pip"
  nat_name                      = "${local.prefix}-nat"
  app_ip_name                   = "${local.prefix}-app-ip"
  db_ip_name                    = "${local.prefix}-db-ip"
  app_vm_name                   = "${local.prefix}-app-vm"
  db_vm_name                    = "${local.prefix}-db-vm"
  backend_bastion_pip_name      = "${local.prefix}-bastion-pip"
  backend_bastion_subnet_name   = "${local.prefix}-bastion-subnet"
  backend_bastion_name          = "${local.prefix}-bastion"
  backend_bastion_ipconfig_name = "${local.prefix}-bastion-ipconfig"
  internal_lb_name              = "${local.prefix}-internal-lb"
  lb_frontend_name              = "${local.prefix}-internal-lb-frontend-ip"
  lb_pool_name                  = "${local.prefix}-internal-lb-pool"
  lb_health_probe               = "${local.prefix}-internal-lb-service-probe"
  lb_rule                       = "${local.prefix}-internal-lb-rule"
  
  common_tags = {
    Project   = "MyResume"
	  Tier      = "Backend"
	  ManagedBy = "Terraform"
  }
}