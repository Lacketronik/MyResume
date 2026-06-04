terraform {
  cloud {
    organization = "MyResume"
    workspaces {
      name = "Phase04"
    }
  }
  required_version = ">= 1.15.4"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = local.location
  tags     = local.common_tags
}

resource "azurerm_static_web_app" "swa" {
  name                = local.swa_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Free"
  sku_size            = "Free"

  tags                = local.common_tags
}

resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.swa.id
  domain_name       = "faliqdoescoding.com"
  validation_type   = "dns-txt-token"
}

resource "cloudflare_record" "azure_txt_validation" {
  zone_id = "<CLOUDFLARE ZONE ID>"
  name    = "_dnsauth"
  type    = "TXT"
  value   = azurerm_static_web_app_custom_domain.apex.validation_token
  ttl     = 3600
}

resource "cloudflare_record" "apex_routing" {
  zone_id = "<CLOUDFLARE ZONE ID>"
  name    = "@"
  type    = "CNAME"
  value   = azurerm_static_web_app.swa.default_host_name
  ttl     = 1
  proxied = false
}

resource "azurerm_static_web_app_custom_domain" "www" {
  static_web_app_id = azurerm_static_web_app.swa.id
  domain_name       = "www.faliqdoescoding.com"
  validation_type   = "cname-delegation"
}

resource "cloudflare_record" "www_routing" {
  zone_id = "<CLOUDFLARE ZONE ID>"
  name    = "www"
  type    = "CNAME"
  value   = azurerm_static_web_app.swa.default_host_name
  ttl     = 1
  proxied = false
}