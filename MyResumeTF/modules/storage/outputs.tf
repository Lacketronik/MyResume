output "frontend_blob_url" {
  value = azurerm_storage_blob.frontend_blob.url
}

output "backend_blob_url" {
  value = azurerm_storage_blob.backend_blob.url
}

output "shared_sas" {
  value = data.azurerm_storage_account_sas.shared_sas.sas
  sensitive = true
}

output "storage_account_id" {
  value = azurerm_storage_account.shared_sa.id
}
