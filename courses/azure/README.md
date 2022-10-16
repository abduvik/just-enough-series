# Azure

For AZ-204 Exam

## YouTube Video

## Summary

Azure is one of the biggest Cloud Providers and it's owned by Microsoft

### Main Services

#### [Resource Groups](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)

They are grouping of different resources

#### App Service

- Used to host apps on Azure and we delegate scaling and managing it to Azure
- Apps are hosted on an App Service plan which define how the app vm is behaving
- App Service plans determines how much resources you will get
- App Service plans can be: Shared, Dedicated, Isolated, Consumption (for functions)
- App Service plan can be though of a certain flavour of a VM
- Azure Funtions can run in the same App Service plan
- Authentication & Authorization can be handled by Azure using Identity Providers or even by the app itself
- Azure service plans are divided into two modes of networking:
  - Multi-Tenant: Free, Shared, Basic, Standard, Premium, PremiumV2, and PremiumV3 SKU pricings
  - Single-Tenant: Isolated SKU pricing
- More on [Networking](https://learn.microsoft.com/en-us/azure/app-service/networking-features)
- Environment secrets are configured in "Configurations"
- Settings for app is configured under "General Settings"
- You can define custom handlers for files with certain extension and mount volumes under "Path Mapping"
- Multiple logging levels is supported: Application, Web Server, Detailed error, Failed request trace, Deployment.
- Linux only supports Application and Deployment logging, windows supports the reset.
- Logs can be saved on File system (temporay), Blob storage (Long-Term) or can be streamed
- Available security certificates: Free Managed certificate, Puchased from Azure, Imported from a Key Vault, Upload private certificate, Upload public certificate (to access external resources)
- You can redirect all HTTP to HTTPS under "TLS/SSL Settings"
- Feature Flags can be managed also with App Configurations
- Each flag should have a name and a filter that when evaluated will set it to `True` and we can set the return value directly too.
- Auto scaling support scale in-out (horizontal scaling)
- Auto scaling condition can be based on a metric (ex: no of HTTP requests) or scheduled for a specific time
- Metrics can ne: CPU %, Memeory %, Disk queue length (I/O Requests), Http Queue Length, Data In, Data Out. It's possible to scale based on other Azure services too.
- Auto scalaing condition is done over a period of time "Duration" and can be aggregated by: Average, Minimum, Mammum, Total, Last and Count.
- Not all pricing tiers have auto-scaling
- Auto-scalaing has minimum, default, maximum values
- Auto-scalaing prevents "flapping" where after a scale out it scales in and then scales out again. Read the example [here to understand how to avoid it](https://learn.microsoft.com/en-us/training/modules/scale-apps-app-service/5-autoscale-best-practices)
- Make scale out higher than scale in with a correct margin to avoid flapping
- With multiple Auto-scaling rules, any rule will scale-out but all rules must be met to scale-in

**Commands**

- `az webapp up -g $resourceGroup -n $appName --html`: Create and update App Service

#### Azure Functions

- They are the stateless solution from Azure
- Execution is done on:
  - Triggers: When to execute the code
  - Binding: Coding for input and Output
- Azure Logic Apps: Similar to functions but more GUI friendly and has many integrations (similar to Zapper)
- Azure WebJobs
  // @todo: need to read more about it again

- [Azure Functions Core tools](https://github.com/Azure/azure-functions-core-tools): Used for local development
- [Testing functions locally with http-triggers and non-http triggers](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash)

#### Azure Cosmos DB

- Multi-master replication support which reduces latency to almost real-time
- 99.999% read and write availability all around the world.
- Add and remove regions at anytime without the need to pause/redeploy the application
- Multiple data consistency mode: Strong, Bounded Staleness, Session, Consistent Prefix, Excentual
- There are multiple APIs available: Core (SQL), MonogoDB, Cassandra, Table, Gremlin
- Item index = Partition Key + Item ID
- Cosmos DB Account > Container > Table > Items

#### Service Bus

- Supports the following

  - No polling is required, FIFO, automatic de-duplication
  - Pub/sub using topics
  - Process messages as streams using session ID // @todo new to find what that is?
  - 64kb < Message size < 256 KB

- It consists of the folloing entities
  - Queues (supports FIFO)
    - FIFO
    - Two modes to recieve messages
      - Recieve and Delete: one-stage, mark as consumed when read, system is ok tolerating missed messages
      - Peek Lock: Two-stages, mark as consumed after done, there is a timeout for failure
  - Topics and Subscriptions
    - Go for 1-to-many
    - Publisher (Message) -> Topic -> Subscription -> Consumer
    - Subscription is in this case like a virtual queue
    - Subscriptions supports filters to select a certain sub-set of messages

**Commands**

- Create a service bus namespace

```sh
az servicebus namespace create \
    --resource-group az204-svcbus-rg \
    --name $myNameSpaceName \
    --location $myLocation
```

- Create a service bus queue

```sh
az servicebus queue create --resource-group az204-svcbus-rg \
    --namespace-name $myNameSpaceName \
    --name az204-queue
```

#### Storage Queue

- Similar to Service bus and supports the following
  - Queue size over 80 GB
  - Track progress in the queue // @todo: what it means?
  - Good for logging
  - It's a subset of the Blob storage
  - It consists of a queue and an Azure Storage
  - It's simplier than Service Bus

// @todo: Check this later https://learn.microsoft.com/en-us/azure/storage/queues/storage-dotnet-how-to-use-queues?tabs=dotnet

- [Azure Storage vs Service Bus](https://medium.com/awesome-azure/azure-difference-between-azure-storage-queue-and-service-bus-queue-azure-queue-storage-vs-servicebus-3f7921b0159e)
- [Azure Queues and Service Bus queues - compared and contrasted](https://github.com/Huachao/azure-content/blob/master/articles/service-bus/service-bus-azure-and-service-bus-queues-compared-contrasted.md)

### General Commands

- Create a resource group
  `az group create --name az204-svcbus-rg --location $myLocation`

- Delete a resource group
  `az group delete --name az204-svcbus-rg --no-wait`

## Extra resources

- [Adam Marczak - Azure for Everyone
  ](https://www.youtube.com/c/Azure4Everyone)
- [Azure Storage Explorer](https://azure.microsoft.com/en-us/products/storage/storage-explorer/#getting-started)
