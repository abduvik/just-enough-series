# Kubernetes

## YouTube Video

## Kubernetes Architecture

- Master Node: Controls k8s Nodes. In Production, we can have one master and multiple back master nodes
- Worker Nodes: VMs or Servers that are connected to the cluster
- Controller Manager: Tracks the status of the cluster
- Scheduler: Add/Remove/Scale Pods
- etcd: key-value store holds the current state of the cluster
- Virtual Network: Connects everything

## Cluster components

- k8s Proxy
- k8s DNS
- k8s UI

## Kubernetes Commands

- `kubectl get nodes`: Get available nodes connected to kubernetes cluster
- `kubectl describe nodes <node_name>`: Get information about the node

## Kubernetes YAML File
