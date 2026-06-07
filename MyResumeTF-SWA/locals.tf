locals {
  prefix = "myresume-production"

  location = "centralus"
  rg_name  = "rg-${local.prefix}"
  swa_name = "swa-${local.prefix}"

  common_tags = {
    Project     = "MyResume"
    Environment = "Production"
	ManagedBy   = "Terraform"
  }
}