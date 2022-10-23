# Terraform

## YouTube

## Summary

Terraform consists of:

- Providers: Allow connecting the configuration to the cloud provider API
- tfstate file: It stores the current state of our architecture. Must be encrypted.

Important Commands

- `terraform init`: Add required providers plugins code
- `terraform plan`: Check what will change to our system
- `terraform apply`: Apply the changes
- `terraform destroy`: Delete the whole system.

Every resource consists of like this

```tf
resource "<provider_name>_<resource_type>" "<resource_name>" {
  <property> = <property_value>
}
```

We can reference data from one resource into another resouce

```
vpc_id = <provider_name>_<resource_type>.<resource_name>.<property_key>
```
