# Kubernetes

## YouTube Video

## Resource Management

### Namespaces

They are groups for resources in a single cluster.

- `kubectl get namespace`: Get available namespaces in the cluster
- `kubectl create namespace <namespace>`: Create a namepsace

You can target a namespace by

`kubectl ... --namespace=<namespace_name>` or `kubectl ... -n=<namespace_name>`

for all namespaces

`kubectl ... --all-namespaces`

Namespace-based scoping is applicable only for namespaced objects (e.g. Deployments, Services, etc) and not for cluster-wide objects (e.g. StorageClass, Nodes, PersistentVolumes, etc).

### Context

They are only managed by the kubectl client part and it helps to manage accessing different contexts.

A context is: cluster + namespace + user

- `kubectl config get-contexts`: Get all Contexts
- `kubectl config current-context`: Get current Context
- `kubectl config set-context --current --namespace=<namespace>`: Use namespace for the current context
- `kubectl config set-context <context_name> --cluster=<cluster> --namespace=<namepsace> --user=<user>`: To create a new context
- `kubectl config use-context <context_name>`: User a context

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

`<resource_type>` can be `pods`, `nodes`

### Managing Objects

- `kubectl run <container_name> --image <image_name>`: Run a container in the cluster
- `kubectl apply -f <file.yaml>`: Apply YAML file to k8s
- `kubectl edit <resource_type> <object>`: Open interactive edit for the object
- `kubectl delete <resource_type> <object>`: Delete object
- `kubectl label <resource_type> <object> <key>=<value>`: Add label for an object
- `kubectl label <resource_type> <object> <key>=<value> --overwrite`: Overwrite label for an object
- `kubectl label <resource_type> <object> <key>-`: Delete label for an object
- `kubectl delete -f <file.yaml>`: Delete onject from a YAML file
- `kubectl get <resource_type>`: Get available objects in the resource type
- `kubectl describe <resource_type> <object>`: Get information about the node

### Debugging

- `kubectl logs <pod_name>`: Get logs for a running container
- `kubectl exec -it <pod_name> -- bash`: Log into a running container
- `kubectl cp <pod_name>>:<source_path> <local_target_path>`: Copy files from container to local machine
- `kubectl port-forward <pod_name> <port_local>:<port_container>`: Port forwarding from local machine to a running container
- `kubectl get events`: Get latest events happen on objects
- `kubectl top <resource_type>`: Get how much resources are used by objects

### Cluster Management

These commands are good when we want to remove a machine from the cluster for repairs

- `kubectl cordon <node_name>`: Prevent running any new pods on the node
- `kubectl uncordon <node_name>`: Allow running any new pods on the node
- `kubectl drain <node_name>`: Remove running pods from a node

## Kubernetes YAML File

```yaml
apiVersion: ..
kind: ...
metadata: ...
spec: ...
```

### Pod

[Example YAML file for pods](./examples/pods.yml)

Pods can support:

- Images to run using `image`
- Acessing pods using `exec`
- Getting logs using `kubectl logs`
- Health Checks for: Liveness (container is healthy), Readness (container ready to serve)
- Resource Managment to set maximum and minimum resources
- Persisting data using volumes
- Ports mapping

## Questions

What should be in a Pod?

If the containers can work effectively on different machines or they scale independently then no need to put them in the same pod as it will be an anti-pattern.
