# Kubernetes

## YouTube Video

## Resource Management

### Namespaces

They are groups for resources in a single cluster.

You can target a namespace by

`kubectl ... --namespace=<namespace_name>` or `kubectl ... -n=<namespace_name>`

for all namespaces

`kubectl ... --all-namespaces`

### Context

They are only managed by the kubectl client part and it helps to manage accessing different contexts.

A context is: cluster + namespace + user

- Get All Contexts: `kubectl config get-contexts`
- To create a new context : `kubectl config set-context <context_name> --cluster=<cluster> --namespace=<namepsace> --user=<user>`
- User a context: `kubectl config use-context <context_name>`

## Cluster Architecture

- Master Node: Controls k8s Nodes. In Production, we can have one master and multiple back master nodes
- Worker Nodes: VMs or Servers that are connected to the cluster
- Controller Manager: Tracks the status of the cluster
- Scheduler: Add/Remove/Scale Pods
- etcd: key-value store holds the current state of the cluster
- Virtual Network: Connects everything

All objects in kubernetes are RESTful resources and can be accessed with

- `kubectl get <resource_name> <object_name>`: Get a single resource object
- `kubectl get <resource_name>`: Get all objects of a resource
- `kubectl get <object_name>`: Get a single object
- `kubectl ... -o wide`: Get more information on objects
- `kubectl ... -o json`: Get objects information in JSON format
- `kubectl ... -o yaml`: Get objects information in YAML format
- `kubectl describe <resource_name> <object_name>`: Get human-readable full description of an object
- `kubectl get ... --watch`: Watch objects
- `kubectl explain <resource_name>`: Get more information about a resource

## Cluster components

- k8s Proxy
- k8s DNS
- k8s UI

## Kubernetes Commands

- `kubectl get nodes`: Get available nodes connected to kubernetes cluster
- `kubectl describe nodes <node_name>`: Get information about the node

## Kubernetes YAML File
