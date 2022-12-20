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

Common operations among resources are: `create`, `delete`, `get` and `describe`

## Cluster components

- k8s Proxy
- k8s DNS
- k8s UI

## Kubernetes Commands

`<resource_type>` can be `pods`, `nodes`, `services`, `endpoints`

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
- `LoadBalancer`: In case of using a cloud provider, we can expose the service to the outside world. This happens by the load balancer integration of the cloud provider. k8s recently supported internal load balancers too.

You can tunnel traffic from your machine to a services on minikube using

```shell
minikube service <service_name> --url
```

or using kubectl

```shell
kubectl port-forward service <service_name> <host_port>:<pod_port>
```

We can create selector-less services and we can assign ip addresses manually. This is good if we would like to redirect traffic to an external resource outside of the cluster.

Services are connected to an endpoint resource that keeps track of the ips of the pods depending on the selectors. k8s creates it automatically with a selector. The controller for the Service selector continuously scans for Pods that match its selector, and then POSTs any updates to an Endpoint object also named "my-service".

### Ingress

It consists of an Ingress description and an Ingress Controller.
Ingress Controllers have many implementations like Ingress-Nginx and Contour-Envoy for example. They direct layer 7 requests to services. And they can read the header and paths, and subdomains to direct to a certain service.

When connecting to the outside world, it looks like this:

Client (Browser) -> Load Balancer -> Ingress -> Service -> Node -> Pod

Ingress supports having tls and it uses k8s secrets objects to store the keys for them. We can use cert-manager.io to manage certificate updates.

### ReplicaSets

They are used to scale/replciate pods. It also can:

- Migrate lone pods to become under the ReplicaSet
- We can remove a pod from a ReplicaSet to Quarantine it and then the ReplicaSet will create a new one. This helps when we want to debug a pod but rather debugging it only through the logs we want the actual pod. This is done by removing the lables on the pod that the ReplicaSet uses

ReplicaSet definition consists mainly of: replicas count, selector and template of the pod

ReplicaSet can be autoscaled using `horizontalpodautoscalers` or `hpa` for short which provide Hotizontal Pod Autoscaling depending on a certain metric. Kubernets contains a service by default which provide different metrics about the cluster called `metrics-server`

```sh
kubectl get pods --namespace=kube-system
```

To imperatively apply the autoscaling use

```sh
kubectl autoscale rs kuard --min=2 --max=5 --cpu-percent=80
```

### Deployments

A Deployment resource is used to manage rolling out updates and scaling by managing replicasets. If we would like to update a pod from v1 to v2, we will have to:

- First to create replicaset for v2
- Scale down replicaset for v1
- Remove replicaset v1

Deployment will handle all of this for us. It has properties `OldReplicaSets` and `NewReplicaSet` to point to these deployments.

- `kubectl rollout status deployments <deployment_name>`: Monitor the status of the deployment
- `kubectl rollout pause deployments <deployment_name>`: Pause deployment roll out
- `kubectl rollout resume deployments <deployment_name>`: Resume deployment roll out
- `kubectl rollout undo deployments <deployment_name>`: Undo deployment last roll out
- `kubectl rollout undo deployments <deployment_name> --to-revision=<revision_number>`: Roll back to a specific revision
- `kubectl rollout history deployments <deployment_name>`: Check out the roll out history
- `kubectl delete -f kuard-deployment.yaml --cascade=false`: To delete the deployment without deleting the underlying replicaset.

Specify rollout reason under: `spec.template.metadata.annotations[kubernetes.io/change-cause]`

Use `spec.revisionHistoryLimit` to specify how many should the roll out history be saved

There are two strategies for deployments:

- `Recreate`: Deletes all pods in the replicaset and then replicaset will re-create them using the new image version. Downtime is expected. Fast and good for testing.
- `RollingUpdate`: Incremently removes pods and create the new pods. Slow and no-downtime. Good for production.

Some of the deployment rollout important parameters:

- `maxUnavailable`: When set to a value, it means how much pods it can destroy per deployment step. So it will destroy old pod and then create a `n` or `%` new pod.
- `maxSurge`: This is the opposite. It's how many `n` or `%` pods can be created and then delete the old ones. So it will create aka. surge and then delete the old pod
- `minReadySeconds`: This is to add delay after the pod is marked as ready from readiness checks before going to the next step
- `progressDeadlineSeconds`: This is how many seconds between each steps which if exceeds will make the deployment rollout as failure/timeout and then rollback. This will be passed in case the pod readiness check fails for a long time.

### DaemonSets

They are like deployments in the sense that they are used for rolling out releases and updates with scalability features. The difference is that DeamonSet will ensure that a pod is running on every node in the cluster.

We can also sepcifity it to run pods on a certain group of nodes using `selector.matchLabels`.

DaemonSets supports `OnDelete` and `RollingUpdate` strategy. `OnDelete` is updating after manually deleting the pod.

DaemonSets rollouts has two properties

- `spec.minReadySeconds` is how long a pod is considered ready before proceeding with updating the rest of the pods
- `spec.updateStrategy.rollingUpdate.maxUnavailable`: is how many `%` or `n` pods should be unavailable while doing the updates

DaemonSets also supports `--cascade=false`

### Jobs

They are used when we need to run a pod as a oneshot. So it will run once or until a certain conidition is met. Pods can also be run in parallel and have many pods not just single one-offs.

The condition consists of:

- `parallelism`: How many pods can run at the same time
- `completion`: How many pods are done to be considered completed

We can also not set completion and set parallelism to create a work-queue-consumer-like behaviour. So jobs will stay working until they consume a queue in parallel

Jobs have to `restartPolicy`:

- `OnFailure`: will create a new cotainer when failed
- `Never`: will never create a new pod when failed (recommended)

### CronJobs

They can schedule running jobs at certain time/iteration

It is set by `spec.schedule` property

### ConfigMap

It's an API object used to store non-confidential data in key-value pairs

They can be used as:

- Filesystem: ConfigMap is mounted as a file. Each key will become a file. Using `spec.containers[].volumeMounts`
- Environment variable: Used to set environment variables of a pod. Using `spec.containers[].spec.env[].valueFrom.configMapKeyRef`
- Command-line argument: To pass arguments to the container. Using a defined env variable into the `spec.containers[].command`

They can be created using YML or kubectl. It uses `data` instead of `spec` to store key-value pairs.

```
kubectl create configmap my-config \
  --from-file=my-config.txt \
  --from-literal=extra-param=extra-value \
  --from-literal=another-param=another-value
```

### Secrets

They are used to store key-value pair of sensitive data like passwords and API keys. They are stored as plain text in the etcd store but there are ways to encrypt it and cloud providers have their own secrets management solutions that are integrated into managed Kubernetes.

They can be created using kubectl or Kubernetes API or YML (make sure to not store the actual keys in git though).

- `kubectl create secret generic <secret_name> --from-file=pub.crt`: Create a secret from a file

Secrets can be consumed using Kubernetes API or using Secret Volumes which will mount secrets as tmpfs volumes which are stored in RAM and not disks. Using `spec.volumes[].secret.scretName` to define it and then use `spec.containers[].volumeMounts[]` to mount it to a pod.

If we would like to pull a docker image in a private registery, we can create docker secrets and then define `spec.imagePullSecrets` for the Pod yml to use it while pulling the image

Creating key-value pairs for both ConfigMap & Secrets can be with following params:

- `--from-literal=<key>=<value>`: Create a key with a certain value
- `--from-file=<filename>`: Create from a file and use filename as key
- `--from-file=<key>=<filename>`: Create from a file and use a custom key name
- `--from-file=<directory>`: Load a whole directory and each filename is used as a key

## Questions

What should be in a Pod?

If the containers can work effectively on different machines or they scale independently then no need to put them in the same pod as it will be an anti-pattern.

## Content

- [Kubernetes Ingress Explained Completely For Beginners - Updated](https://www.youtube.com/watch?v=GhZi4DxaxxE)
- [Using NGINX as a Kubernetes Ingress Controller](https://www.youtube.com/watch?v=AXZr2OC8Unc)
