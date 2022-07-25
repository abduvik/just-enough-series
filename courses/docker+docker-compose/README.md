# GIT Version Control

## YouTube Video

[![Just Enough Docker & Docker Compose tutorial youtube thumbnail](http://img.youtube.com/vi/-----/0.jpg)](http://www.youtube.com/watch?v=----- "Docker & Docker Compose | Just Enough Series")

## Commands

### Docker

- `docker pull <image>`: Pull Image from Docke Hub
- `docker create <image>`: Create a container from an Image
- `docker start <container_name/container_id>`: Start a container
- `docker stop <container_name/container_id>`: Stop a container
- `docker rm <container_name/container_id>`: Remove a container
- `docker ps`: Get all running containers
- `docker ps -a`: Get all containers
- `docker stop $(docker ps -a -q)`: Stop all containers
- `docker rm $(docker ps -a -q)`: Remove all containers
- `docker image rm $(docker image ls -q)`: Remove all images
- `docker run --name <container_name> -p <host_port>:<container_port> <image>`: Pull, create, start and run a container
- `docker run -d <image>`: Run in detached mode
- `docker run -it <image> <command>`: Run a container and overwrite the default entrypoint
- `docker run -it --entrypoint <entrypoint_command> <image>`: Run a container and overwrite the default entrypoint
- `docker exec -it <image_name> <command>`: Execute a command in a running container with interactive mode
- `docker login`: Login into a Docker Repository
- `docker -v <named_volume>:<path_in_container> <image>`: Bind path in the container to a Docker volume
- `docker -v <path_in_host>:<path_in_container> <image>`: Bind path in the container to another path in the host
- `docker volume ls`: List all volumes
- `docker build <path>`: Build docker image
- `docker build --tag pinger - < <cutom_path>`: Build docker image when the name is not `Dockerfile`

### Docker Compose

- `docker compose build`: Build services of the docker compose
- `docker compose build <service>`: Build a service of the docker compose
- `docker compose create`: create services
- `docker compose start`: start services
- `docker compose run`: Run a command in a services
- `docker compose restart`: Restart services
- `docker compose restart <service>`: Restart a service
- `docker compose pause`: Pause services
- `docker compose unpause`: Unpause services
- `docker compose stop`: Stop services
- `docker compose rm`: Remove stopped containers
- `docker compose up`: Create and start containers
- `docker compose pull`: Pull all services' images. It's good when updating services images
- `docker compose up -d`: Create and start containers in detached mode
- `docker compose up -d <service>`: Create and start containers in detached mode for a certain service
- `docker compose down`: Stop and remove containers

### DockerFile

- `FROM <image>`: Based image
- `FROM <image> as <stage>`: Based image, also assign name to be used for multi-stage image building
- `RUN <command>`: Runs a certain command inside the image
- `Expose <port>/<protocol>`: Used for documentation purposes to available ports
- `COPY <source> <destination>`: Copys file from host to image
- `COPY --from=<stage> <source> <destination>`: Copys file from host to image. Cross stage copy.
- `ADD <source> <destination>`: Similar to `COPY` but can also download and extract tar files
- `ENV <key>=<value>`: Define an environment variables
- `USER <user>:<group>`: Used to define a user to run the commands
- `WORKDIR <destination>`: Set working directory to avoid many `cd`
- `CMD <command> <param1> ...` or `CMD ["<command>", "<param1>"]`: The default command to run for the container
- `ENTRYPOINT <command> <param1> ...` or `ENTRYPOINT ["<command>", "<param1>"]`: The required command to run for the container.

### Docker Compose File

- `services`: Array of services to start
  - `port`: Array of exposed ports
  - `environment`: Array of environment variables
  - `volumes`: mapping of volumes
  - `networks`: Define used network
- `networks`: Defines available networks

## Questions?

- `ADD` vs `COPY`?

  They both have similar functionality but `ADD` can also extract tar file and also download from the network

- `CMD` vs `ENTRYPOINT`?

  They both execute commands.
  Use `CMD` when you want the user of your image to have the flexibility to run whichever executable they choose when starting the container.
  Use `ENTRYPOINT` when you want the container to behave exclusively as if it were the executable it's wrapping.

We can combine both of them and use `ENTRYPOINT` when we need a command to always run when the container starts and `CMD` to pass the parameters. We can then allow our users to overwrite the paramters when using `docker run`.

## Diagrams

![Docker Architecture](./assets/docker-architecture.jpg)
Source: [Docker Docs](https://docs.docker.com/get-started/overview/)

![Docker Life Cycle](./assets/docker-life-cycle.jpg)
Source: [Docker Internals](http://docker-saigon.github.io/post/Docker-Internals/)

## Extra links

- [Docker API Reference](https://docs.docker.com/engine/reference/run/)
- [How Docker internally works](http://docker-saigon.github.io/post/Docker-Internals/)
