locals {
  prefix = "myresume-shared"
  
  storage_account_name_prefix = "sa${replace(local.prefix, "-", "") }"
  container_name              = "deployments"

  common_tags = {
    Project   = "MyResume"
    Tier      = "Shared"
    ManagedBy = "Terraform"
  }
}
