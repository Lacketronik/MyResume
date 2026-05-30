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

output "internal_lb_ip" {
  value       = azurerm_lb.internal_lb.private_ip_address
  description = "The dynamically allocated internal IP of the backend API load balancer."
}

