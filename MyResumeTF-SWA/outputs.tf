output "deployment_token" {
  description = "Deployment token for CI/CD"
  value       = azurerm_static_web_app.swa.api_key
  sensitive   = true
}