variable "location" {
  type        = string
  description = "The Azure region for web tier resource deployment."
  
  validation {
    condition     = contains(["<Region A>", "<Region B>"], var.location)
	error_message = "Error: The location must be either '<Region A>' or '<Region B>'. Lowercase only, no spaces or hyphens."
  }
}

variable "rg_name" {
  type        = string
  description = "The name of the resource group for this region"
}

variable "vnet_cidr" {
  type        = string
  description = "The primary CIDR block for the Virtual Network."
  
  validation {
    condition     = can(cidrnetmask(var.vnet_cidr))
	error_message = "Error: The vnet_cidr must be a valid CIDR notation, such as '10.1.0.0/16'."
  }
}

variable "download_url" {
  type        = string
  description = "The secure SAS URL generated at the root level to pull down the deployment zip package."
  sensitive   = true
}

variable "internal_lb_ip" {
  type        = string
  description = "The frontend IP of the internal load balancer."
}