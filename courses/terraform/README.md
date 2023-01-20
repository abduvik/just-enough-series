# Terraform

## YouTube

## Summary

Terraform consists of:

- Providers: Allow connecting the configuration to the cloud provider API
- `*.tfstate` file: It stores the current state of our architecture. Must be encrypted.

Important Commands

- `terraform init`: Add required providers plugins code
- `terraform plan`: Check what will change to our system
- `terraform apply`: Apply the changes
- `terraform destroy`: Delete the whole system.

Every resource consists of like this

```terraform
resource "<provider_name>_<resource_type>" "<resource_name>" {
  <property> = <property_value>
}
```

We can reference data from one resource into another resouce

```
vpc_id = <provider_name>_<resource_type>.<resource_name>.<property_key>
```

Terraform gives support to concepts similar to other programming languages like:

- Variables
- Outputs
- Conditionals & Loops
- Modules

### Variables

To create a variable

```tf
variable "instance_type" {
  description = "just a description for the variable"
  type        = string   # also boolean & number
  default     = "default value"
  sensitive   = true     # in case of sensitive data to hide from logs
}
```

to set the varibles we can

- Manually entry in Terraform plan/apply
- Inside the `local` block
- `TF_VAR_<name>` environment variables
- `*.tfvars` files
- Command Line `-var` and `-var-file`

Types can be

- Primative: string, number, bool
- Complex: list, set, mao, object, tuple

### Outputs

They are like the return of functions, when we run a certain resource, we get the object returns and we can reference them using the `output` block

```tf
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}
```

### Modules

They are used to abstract creating multiple resources into a single module. They can be hosted on many places like:

- Local paths
- Terraform Repository
- Git
- HTTP Urls
- S3 Buckets

```tf
module "module_name" {
  source "../webapp" # path to the module root directory

  # Input variables
  bucket_name = "webapp-bucket"
  domain      = "example.com"
}
```

### Workspaces

Terraform has workspaces to manage multiple environments

- `terraform workspace list`: List available workspaces
- `terraform workspace new <env_name>`: Create a new workspace
- `terraform workspace select <env_name>`: Select a workspace

Available variable is `terraform.workspace` for the current workspace

We can also use files and directories structure to manage workspaces instead of using terraform workspaces and it's more recommended.

## Resources

- [Complete Terraform Course - From BEGINNER to PRO! (Learn Infrastructure as Code)](https://www.youtube.com/watch?v=7xngnjfIlK4)
