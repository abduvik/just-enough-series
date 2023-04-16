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
- Persisting data using volumes `spec.volumes[]`. Note that this lives only for the pods life, and if we need to presist beyond this we can create a `PersistentVolume`.
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

#### External Services

If we need to direct requests to external domain with DNS, we can create an external service that will direct to a totally another server. We dont' need to then set selectors.

```yml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```

This will create a CNAME record in k8s DNS for `my-service.svc.prod.cluster` to `my.database.example.com`

If you need to direct to an IP address instead, you will need to create an External Service but without setting the `externalName`, this will create an endpoint-less service and you can assign an endpoint mainly and set the `subsets.address[].ip` in its configs.

But k8s doesn't support health checking for these types of services, so we have to do it manually.

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

To update the values for ConfigMaps & Secrets:

- If it's created from a YAML file, we just update the value and run `kubectl apply -f <filename>`
- If the values are files, we will need to re-create then and then replace
  - `kubectl create secret generic kuard-tls --from-file=kuard.crt --dry-run -o yaml | kubectl replace -f -`
    This will dry-run create secret and output to yaml file and then we run replace to tell k8s to replace old value with the new value
- You can use `kubectl edit`

### Role-Based Access Control (RBAC)

#### Authentication

Authentication refers to the process of verifying the identity of a user or process that is requesting access to resources in the cluster. This is typically done through the use of tokens or certificates.

There are several ways to authenticate with a Kubernetes cluster, including:

- Service accounts: A service account is a special type of user that is created automatically for each namespace in a cluster. Service accounts are used to authenticate processes that run within the cluster, such as pods.
- Tokens: Tokens are strings that are used to authenticate users or processes with a Kubernetes cluster. They can be generated by the cluster administrator and given to users or processes that need access to the cluster.
- Client certificates: Client certificates are digital certificates that are used to authenticate users or processes with a Kubernetes cluster. They are typically issued by a certificate authority (CA) and must be presented by the client when requesting access to the cluster.
- OpenID Connect (OIDC): OIDC is an open standard that allows users to authenticate with a cluster using their existing account on an OIDC-compliant identity provider, such as Google or GitHub.
- Cloud authentication providers, such as Azure Active Directory and AWS Iden‐
  tity and Access Management (IAM)
- HTTP basic authentication: HTTP basic authentication is a simple method of authentication that involves sending a username and password with each request to the cluster.

The specific method of authentication used will depend on the needs of your organization and the security requirements of your cluster.

#### Authorization

Authorization in Kubernetes is managed under the term RBAC and it's how permissions are given to perform different operations. Authorization is a combination of the
identity of the user, the resource (effectively the HTTP path), and the verb or action
the user is attempting to perform. It mainly consists of:

`Roles <-> RoleBindings <-> Users/Groups`

Core components are:

- `Roles`: Roles are sets of permissions that define what a user or process is allowed to do within a cluster. They can be created, modified, and deleted as needed.
- `RoleBindings`: RoleBindings are used to assign a role to a specific user or group of users. They specify which users or groups are granted the permissions defined in a role.
- `ClusterRoles`: ClusterRoles are similar to roles, but they apply cluster-wide rather than to a specific namespace. They can be used to grant permissions for actions that span multiple namespaces, such as creating and managing resources in any namespace.
- `ClusterRoleBindings`: ClusterRoleBindings are used to assign a ClusterRole to a specific user or group of users. They specify which users or groups are granted the permissions defined in a ClusterRole.
- `User`: Users are the entities that are granted permissions to access resources in a cluster. They can be human users or system processes.
- `Group`: Groups are collections of users that can be granted permissions as a unit. This can be useful in large organizations where it is impractical to create individual bindings for each user.

There are two identities in Kubernetes:

- Service accounts: They are associated with components running in the cluter
- User accounts: They are for actualy users or automation tools

`Roles` & `RolesBindings` & `ClusterRoles` & `ClusterRoleBindings` are resources created in Kubernetes using YAML or kubectl.

- `Roles` & `ClusterRoles`: They define roles and associate them to resource types and verbs (actions to be performed). `name` & `namespace` are defined under `metadata`
- `RolesBindings` & `ClusterRoleBindings`: They associate roles under `roleRef` to `subjects` which can be of kind `User` or `Group`

Common used verbs are: `create`, `delete`, `get`, `list`, `patch`, `update`, `watch`, `proxy`.

- `kubectl get clusterroles`: To get available roles
- `kubectl get clusterrolebindings`: To get availanle roles bindings
- `kubectl auth can-i <verb> <resource>`: To validate if user can do a certain action on a resource
- `kubectl auth reconcile -f <file>`: Creates or updates `rbac.authorization.k8s.io/v1` API objects from a manifest file aka. to manage roles & roleBindings. YOu can also pass `-dry-run=client` to test it.

Aggregated ClusterRoles are way to aggregate several ClusterRoles into one combined ClusterRole and they are updated whenever one of the underlying roles is changed. They use labes for this.

> If you are running a Kubernetes service on the public internet
> or an other hostile environment, you should ensure that the
> `--anonymous-auth=false` flag is set on your API server.

### Service Mesh

Services and Ingress helps to connect pods from outside to inside or between pods but Service Mesh is an upgrade to this and it spans the whole cluster to provide more advanced networking capabilities, mainly:

- Traffic Encyption and Authentication between pods
- Traffic shaping to route some traffic to a service and the rest of traffic to the other service which is good for A/B testing
- Observerability between different microservices for debugging so we can trace a certain request among them

There is no standard or defacto Service Mesh and they are implementing using CUstom Resource Definitions in kubernetes. A service mesh will add a side car pod in the app to intercept network requests and apply the needed rules. And there is no need to change the pod yml definitions as they are basically injected through the Admission Controller in kubernetes that incepts requests when doing any operations on Kubernetes objects such as creating new ones.

Few know implementations are:

- Istio
- Linkerd
- Consul Connection
- Open Service Mesh
- AWS App Mesh (proprietary)

### Persistent Volumes

Similar to nodes & pods for managing compute resources and consumers in the cluster, we also have `PersistentVolume` and `PersistentVolumeClaim` resources to define what volumnes we have and what resources can be used.

-`PersistentVolume` will define volumes that we have in the cluster and they can be NFS, iSCSI, or a cloud-provider-specific storage system

- `PersistentVolumeClaim` will define usage requests for volumes and they can be used by pods for example

### Storage Solutions

There are two types of storage in kubernetes. One that lives for the life of the pod and another that lives beyond this and it's called `PersistentVolume`

How we can integrate storage solutions to kubernetes:

- We can use External Services to connect an external storage to our cluster without the need to create statefulsets
- Creating a single pod to host our data as a singleton instance
  We can do this with a combination of:
  - Creating a PersistentVolume
  - Create a PersistentVolumeClaim
  - Create our Pod (using ReplicaSets) and make use our PersistentVolumeClaim

We also have StorageClass resources which can dynamically create a PV when we request a PVC. This is helpful we don't want to create a PV first.

But keep in mind that when we provision them dynamically, the life span of the PV is now tied to the PVC which is by default tied to the Node using it, so if we deleted the node it will be all deleted.

#### StatefulSets

StatefulSets are just like ReplicaSets but they are used to create and maintain stateful pods. They create them with the following steps:

- Each replica gets a persistent hostname with a unique index (e.g., `database-0`, `database-1`, etc.).
- Each replica is created in order from lowest to highest index, and creation will pause until the Pod at the previous index is healthy and available. This also applies to scaling up.
- When a StatefulSet is deleted, each of the managed replica Pods is also deleted in order from highest to lowest. This also applies to scaling down the number of replicas.

That's why it's also important to add health & liveness probes to our pods so that when they are created it can follow-up creating the rest.

If we are creating a statefulset for a database app for example and we need to assign which one is the primary pod and which one is the replica. If we need to configure them, we can use `initContainers` which will start a container to do this configuration before running the actual pod.

#### Extending Kubernetes

We can extend kubernetes using two things:

- Admission Controllers: They are like proxy between Authenticatin the k8s api call and the k8s server. They can be used to either mutatue the api or validate it or do both.
- Custom Resource Definitions: They are used to define new resources in the cluster that can be created and controlled by k8s as a native resource

There are other ways to extend k8s like: Container Network Interface/Container
Storage Interface/Container Runtime Interface

CRUD for custom resources consists of two parts

- Creating a CustomResourceDefinition to define it as a CRUD resource in k8s
- Custom Controller to act on the api changes and watch them. We can either poll the api server or implement the Watch API

We then need to do two other functionalities which are

- Validating: To validate that the submitted object is valid and this can be done by Open API specification or a validating Admission Controller which is of kind `ValidatingWebhookConfiguration` which defines an endpoint to do HTTP requests and confirms if it's working correctly. Requests are done over HTTPS, so a certificate is needed, either from a certified issuer or k8s own certificate authority (CA)
- Defaulting: Some like validating, we will implement another type of hook of adminission controller which is the `MutatingWebhookConfiguration`

Use cases for CRD:

- Stronging Typed data, using CongfigMaps is not typed, but with CRDs we can use `MutatingWebhookConfiguration` to do the type checking
- Complier or Abstraction pattern, where a CRD represents different pods and services that are going to be "complied".
- Operator pattern which is the most complex use case and here we are building an app that monitors and do operations on pods while listening to k8s, things like restarting, taking snapshots, backups and more complex operations which opens a big gate for k8s

[Kubebuilder](https://kubebuilder.io/introduction.html) is a great resource to learn to extend k8s API

#### Using CPL with Kubernetes

There are k8s clients for Go,Java, .NET and Python. They are created from the same [OpenAPI specification](https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json)

To authenticate the API, there are two ways:

- Using kubeconfig file or KUBECONFIG environment variable
- Inside the pod, it relies on its context and k8s exposes endpoints under `kubernetes` DNS

There are two important concepts to understand before interacting with k8s API through it's clients/SDK:

- Resources can be namespaced or cluster-level and it appears in the SDK's methods:
  - Namespaced like pods and deployments
  - Cluster-level like CustomResourceDefinitions and ClusterRoleBindings
- APIs are groupped under different API Groups and each API group will have its client, ex: `AppsV1Api()`

Examples:

```python
config.load_kube_config()
api = client.CoreV1Api()
pod_list = api.list_namespaced_pod('default')
```

```Java
ApiClient client = Config.defaultClient();
Configuration.setDefaultApiClient(client);
CoreV1Api api = new CoreV1Api();
V1PodList list = api.listNamespacedPod("default");
```

```csharp
var config = KubernetesClientConfiguration.BuildDefaultConfig();
var client = new Kubernetes(config);
var list = client.ListNamespacedPod("default");
```

For Kubernetes resources you can:

- Create, Replace, Patch, Delete resources
- Watch changes either with polling or listening to event changes
- Interact with individual pods to:
  - Get logs
  - exec a list of commands and listend to outputs using streams (stdin, stdout, stderr) and relying on WebSockets
  - do port-forwarding and, similar to exec, relies on WebSockets

#### Securing Kubernetes

There are two main concepts when securing Pods:

- Defense in depth: Adding more security every layer aka. multiple bike locks
- Least privilege: Restrict everything and then start granting access on only required resources

`securityContext` option can be configured on the Pod or Container level and has many options like:

- User permissions and access control to objects like files using User ID (UID) or Group ID (GID)
- `readOnlyRootFilesystem` mounts the container's root filesystem as read-only
- `allowPrivilegeEscalation` controls whether a process can gain more privileges than its parent process
- Run as privileged or unprivileged
- Linux kernel security options like:
  - Seccomp: Restricting system calls espcially in privileged mode
  - SELinux: Is used to monitor and control access of programs running in Fedora, CentOS and RHEL. Also check: https://www.youtube.com/watch?v=fibllWD1_4s
  - AppArmor: Program profiles to restrict capabolities of individual programs

If security context applied to both pod and container, the container has higher priority

Some settings:

- `runAsNonRoot`: pod/container must run as nonroot user, otherwise it will fail
- `runAsUser/runAsGroup`: overwrite the default user/group of the container
- `fsgroup`: change the group of the files/directors in a volume
- `allowPrivilegeEscalation`: can the container process gain more previleges
- `privileged`: should container run as privilege
- `readOnlyRootFilesystem`: mounts the container's root filesystem as read-only.

[amicontained](https://github.com/genuinetools/amicontained) is a tool that can help you check if you have created the correct configurations that will be used when creating containers.

If we want to apply security rules across a namespace instead of each Pod we can use Pod Security feature. For Pod Security, we have Policy Standards and Modes for each one.

- Policy Standards can be: `Privileged`, `Baseline`, `Restricted`
- Modes can be: `Audit`, `Warn`, `Enforce`

We defined them as labels for a kind of `Namespace` using these props:

- `pod-security.kubernetes.io/<MODE>: <POLICY>`
- `pod-security.kubernetes.io/<MODE>-version: <VERSION>`

We can also check these rules for namespaces before applying them to see which pods will violate these rules using:

```sh
kubectl label --dry-run=server --overwrite ns --all pod-security.kubernetes.io/enforce=baseline
```

[Kubernetes Security Profiles Operator](https://github.com/kubernetes-sigs/security-profiles-operator) can be used to create profiles and make it easier to use SELinux, seccomp and AppArmor

Service Account management:

It important to disable access to the kubernetes api when pods don't need it for the default service account created by kubenetes in every namespace

```yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
automountServiceAccountToken: false
```

Using different RuntimeClass can improve security too, projects like:

- [Kata Containers](https://katacontainers.io/)
- [Firecracker](https://firecracker-microvm.github.io/)
- [gVisor](https://gvisor.dev/)

k8s interacts with each node containerization system using RuntimeClass Interface and then we can declare resources to use custom RuntimeClass in their yml file

```yml
spec:
  runtimeClassName: firecracker
```

Using `NetworkPolicy` resource to restrict network access between pods or enable them

When we use Network Policy, we need to install a controller to implement it, like:

- [Calico](https://www.tigera.io/project-calico/)
- [Cilium](https://cilium.io/)
- [Weave Net](https://www.weave.works/oss/net/)

Using Service Mesh to do more control of service-to-service communication

Tools that can help with checking if k8s is deployed securely or not:

- [kube-bench](https://github.com/aquasecurity/kube-bench)

#### Policy and Governance

Once we start to have many resources and types, we need some way to manage them.

- Policy: are set of rules, constraints and conditions that can be applied to resources
- Governance: is the process of applying policies to resources and enforcing them

Admission Flow: is how a requests flows in the k8s API server

[![Admission Flow](https://d33wubrfki0l68.cloudfront.net/af21ecd38ec67b3d81c1b762221b4ac777fcf02d/7c60e/images/blog/2019-03-21-a-guide-to-kubernetes-admission-controllers/admission-controller-phases.png)](https://d33wubrfki0l68.cloudfront.net/af21ecd38ec67b3d81c1b762221b4ac777fcf02d/7c60e/images/blog/2019-03-21-a-guide-to-kubernetes-admission-controllers/admission-controller-phases.png)

Admission Controllers: are plugins that can be used to validate or mutate requests before they are persisted to etcd and they can be defined as k8s resources .

`MutatingWebhookConfiguration` and `ValidatingWebhookConfiguration` are used to configure endpoints that k8s can send requests to and they can respond with either admit or deny directive

[Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/) is a tool that can be used to evaluate resources, mutate and audit and check if they are compliant with policies and it uses OPA as a policy engine

[OPA](https://www.openpolicyagent.org/) is a policy engine uses Rego as a query language and it can be used to write policies and it can be used by many tools including even applications. They can also be tested by tools like [Conftest](https://www.conftest.dev/). Also, Rego has a playground [Rego Playground](https://play.openpolicyagent.org/)

Gatekeeper also has some important features:

- Create constraints
- Run audits to find violations
- Run mutatuins across resources to fix violations
- Creating constraints that compares between values in resources
- Expose metrics to Prometheus
- There is also a [Policy Library](https://github.com/open-policy-agent/gatekeeper-library)

## Multi-Cluster

Kubernetes can be used to manage multiple clusters, reasons to do so can be:

- Increase resiliency and redundancy
- Avoid having single point of failure
- Due to regalations or policies for data to be in a specific region
- Decrease latency
- Strong isolation between teams

Few things to consider when moving to multi-cluster:

- You need to have automation in everything to make it easier to manage and enforce consistency
- Versioning between utils used in clusters like: scannin, auditing, logging, monitoring, etc.
- Managing identities and access control tools

For directing traffic between clusters we can use:

- GeoDNS: works on the IP level and route traffic to the nearest cluster.
- Load Balancer: can work on TCP or HTTP level and route traffic to the nearest cluster.

For managing state between clusters we can use Replication and then we can multiple readers to read from the database and one writer to write to it. But the question will be how to make data consistent between clusters. There are two approaches:

- Strong consistency, which gurentees that all readers will see the same data and write is only successful if all data is replicated to all clusters. Good for important read workloads data like financial data.
- Eventual consistency, which gurentees that data will be replicated to all clusters at some point in time but write is successful immediately. Good for heavy write workloads.

It's better to externalize this task as it's very complex and need good expertise.

On the application level, when we need to replicate it to multiple clusters, we have couple of options:

- Replicated Silos: We basically replicate our whole cluster as it is in every region regardless of the workload. This is the easiest way to do it but it's not the most efficient way as it can become expensive and it doesn't need to be scaled in certain low populated regions.
- Sharding: We can shard our data across couple of regions and then replicate it to different clusters. This is the most efficient way to do it but it's more complex.
- Microservice Routing: imagine we have a new service that we've created, do we need to deploy it in every cluster or maybe in some regions only. This design is about individual services deployment independendly of each other in a multi-cluster environment. This is done by having a load balancer for each individual service and it should manage it's own data replication. It may add more work on the teams but it's will be more efficient both from costs and speed.

## Questions

What should be in a Pod?

If the containers can work effectively on different machines or they scale independently then no need to put them in the same pod as it will be an anti-pattern.

## Content

- [Kubernetes Ingress Explained Completely For Beginners - Updated](https://www.youtube.com/watch?v=GhZi4DxaxxE)
- [Using NGINX as a Kubernetes Ingress Controller](https://www.youtube.com/watch?v=AXZr2OC8Unc)
- [Marcel Dempers Kubernetes content](https://github.com/marcel-dempers/docker-development-youtube-series/tree/master/kubernetes)
