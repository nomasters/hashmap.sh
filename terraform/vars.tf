variable "hashmap_site_aws_access_key" {}
variable "hashmap_site_aws_secret_key" {}

variable "site" {
  type = "map"
  default = {
    fqdn = "hashmap.sh"
    bucket = "hashmap.sh"
    name = "hashmap"
    environment = "prod"
    project = "hashmap"
    root_object = "index.html"
  }
}