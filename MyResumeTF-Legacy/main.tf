terraform {
  cloud {
    organization = "MyResume"
    workspaces {
      name = "Phase02"
    }
  }
  required_version = ">= 1.15.4"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

data "archive_file" "dist_zip" {
  type        = "zip"
  source_dir  = "${path.root}/modules/frontend/dist"
  output_path = "${path.root}/dist.zip"
}

data "archive_file" "backend_zip" {
  type        = "zip"
  source_dir  = "${path.root}/modules/backend/backend_api"
  output_path = "${path.root}/backend.zip"
}

module "storage_layer" {
  source            = "./modules/storage"
  location          = "<Region A>"
  rg_name           = "rg-myresume-shared-prod"
  frontend_zip_path = data.archive_file.dist_zip.output_path
  backend_zip_path  = data.archive_file.backend_zip.output_path
}

module "frontend_layer" {
  source       = "./modules/frontend"
  location     = "<Region A>"
  rg_name      = "rg-myresume-web-prod"
  vnet_cidr    = "10.1.0.0/16"
  download_url = "${module.storage_layer.frontend_blob_url}${module.storage_layer.shared_sas}"
  internal_lb_ip = module.backend_layer.internal_lb_ip
}

module "backend_layer" {
  source       = "./modules/backend"
  location     = "<Region B>"
  rg_name      = "rg-myresume-prod"
  vnet_cidr    = "10.2.0.0/16"
  download_url = "${module.storage_layer.backend_blob_url}${module.storage_layer.shared_sas}"
  sql_password = "<db_password>"
}

resource "azurerm_virtual_network_peering" "frontend_to_backend" {
  name                         = "peer-frontend-to-backend"
  resource_group_name          = module.frontend_layer.rg_name
  virtual_network_name         = module.frontend_layer.vnet_name
  remote_virtual_network_id    = module.backend_layer.vnet_id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = true
}

resource "azurerm_virtual_network_peering" "backend_to_frontend" {
  name                         = "peer-backend-to-frontend"
  resource_group_name          = module.backend_layer.rg_name
  virtual_network_name         = module.backend_layer.vnet_name
  remote_virtual_network_id    = module.frontend_layer.vnet_id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = true
}