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
- `kubectl create deployment <deployment_name> --image <image_name> --port=<port)id>`: Run a deployment
- `kubectl scale deployment <deployment_name> --replicas <replica_count>`: Scale a deployment
- `kubectl expose deployment <deployment_name>`: Expose a deployment through a service
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

### Labels and Annotations

They exists in every k8s resource.

- Labels: used for querying and grouping objects
- Annotations: used as extra metadata for specific objects

Commands

- `kubectl run ... --labels="ver-1,app=alpca"`: Create object with certain labels
- ` kubectl get ... --selector="ver=2"`: Use selectors to filter objects

Selectors Operators

| Operator                     | Description                        |
| ---------------------------- | ---------------------------------- |
| `key=value `                 | key is set to value                |
| `key!=value`                 | key is not set to value            |
| `key in (value1, value2)`    | key is one of value1 or value2     |
| `key notin (value1, value2)` | key is not one of value1 or value2 |
| `key`                        | key is set                         |
| `!key `                      | key is not set                     |

Inside yaml

```yaml
selector:
  matchLabels:
    app: alpaca
  matchExpressions:
    - { key: ver, operator: In, values: [1, 2] }
```

Annotations are defined under `metadata.annotations`

```yaml
metadata:
  annotations:
  example.com/icon-url: "https://example.com/icon.png"
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

### Services

They are selectors for pods. so instead of talking to a specific pod with specific ip, services can be used to group these pods under a single name. This helps for service discovery across the system.

Format of a service name

`alpaca-prod.default.svc.cluster.local` -> `<service_name>.<namespace>.svc.<base_domain>`

[Learn how to get this information here](https://stackoverflow.com/questions/59559438/retrieve-the-full-name-of-a-service-in-kubernetes)

Services have endpoints which are the addresses the service is sending traffic to. You can check them by writing

```shell
kubectl get endpoints <service_name> --watch
```

Services have different types

- `ClusterIP`: Exposes the services on a cluster-internal IP.
- `NodePort`: Exposes a certain port on all nodes and route traffic to the service
-

You can tunnel traffic from your machine to a services on minikube using

```shell
minikube service <service_name> --url
```

## Questions

What should be in a Pod?

If the containers can work effectively on different machines or they scale independently then no need to put them in the same pod as it will be an anti-pattern.