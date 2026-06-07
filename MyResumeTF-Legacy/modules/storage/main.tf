resource "random_string" "storage_suffix" {
  length  = 6
  special = false
  upper   = false
}

resource "azurerm_resource_group" "shared_rg" {
  name     = var.rg_name
  location = var.location

  tags = local.common_tags
}

resource "azurerm_storage_account" "shared_sa" {
  name                     = "${local.storage_account_name_prefix}${random_string.storage_suffix.result}"
  resource_group_name      = azurerm_resource_group.shared_rg.name
  location                 = azurerm_resource_group.shared_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = local.common_tags
}

resource "azurerm_storage_container" "deploy_container" {
  name                  = local.container_name
  storage_account_name  = azurerm_storage_account.shared_sa.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "frontend_blob" {
  name                   = "frontend.zip"
  storage_account_name   = azurerm_storage_account.shared_sa.name
  storage_container_name = azurerm_storage_container.deploy_container.name
  type                   = "Block"
  source                 = var.frontend_zip_path
}

resource "azurerm_storage_blob" "backend_blob" {
  name                   = "backend.zip"
  storage_account_name   = azurerm_storage_account.shared_sa.name
  storage_container_name = azurerm_storage_container.deploy_container.name
  type                   = "Block"
  source                 = var.backend_zip_path
}

data "azurerm_storage_account_sas" "shared_sas" {
  connection_string = azurerm_storage_account.shared_sa.primary_connection_string
  https_only        = true

  resource_types {
    service   = false
    container = false
    object    = true
  }

  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }

  start  = timestamp()
  expiry = timeadd(timestamp(), "24h")

  permissions {
    read    = true
    write   = false
    delete  = false
    list    = false
    add     = false
    create  = false
    update  = false
    process = false
    tag     = false
    filter  = false
  }
}
