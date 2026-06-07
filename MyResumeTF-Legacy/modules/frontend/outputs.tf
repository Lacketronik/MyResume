output "rg_name" {
  value       = azurerm_resource_group.rg.name
  description = "The name of the web resource group."
}

output "vnet_id" {
  value       = azurerm_virtual_network.vnet.id
  description = "The Resource ID for the Web Virtual Network."
}

output "vnet_name" {
  value       = azurerm_virtual_network.vnet.name
  description = "The name of the Web Virtual Network."
}

output "web_nic_id" {
  value       = azurerm_network_interface.web_nic.id
  description = "The ID of the Frontend Web VM Network Interface for Load Balancer attachment."
}

output "public_ip_id" {
  value       = azurerm_public_ip.lb_pip.id
  description = "The Resource ID of the allocated Public IP address"
}

output "public_lb_id" {
  value       = azurerm_lb.public_lb.id
  description = "The Resource ID of the public Load Balancer"
}

output "public_ip_address" {
  value       = azurerm_public_ip.lb_pip.ip_address
  description = "The actual public IP address string."
  sensitive   = true
}

