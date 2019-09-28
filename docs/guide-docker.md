---
id: guide-docker
title: Docker guide
---

[![](/dsri-documentation/img/docker.png)](https://www.docker.com/)

Use [Docker](https://www.docker.com/) on your computer to test containers.

## Install

Install Docker [here](https://docs.docker.com/install/).

If Docker can't access internet when building you might want to change the DNS (to use Google's one). 

* E.g.: `wget: unable to resolve host address`

> On Linux: `vim /etc/resolv.conf` > `nameserver 8.8.8.8`

> For issues related to Docker on Windows, see the [Docker on Windows](docs/guide-windows) page.

---

## Basic Docker commands

### Run a container

A Docker image can be run to create a container in 2 ways
* `-it` Interactive: the process is attached to the terminal and you can stop it using ctrl+C
* `-d` Detached: the process is detached and will continue if you exit the terminal.

---

### Stop a container

To get a Docker container ID and stop it:
```shell
docker ps
docker stop my-container
```

Automatically delete a container after run
You can use the `--rm` flag to automatically delete a container after its run. It avoid accumulating containers and wasting memory.
```shell
docker run -it --rm my-container
```

---

### Share volumes

A lot of images will require input files, the best way to provide them is to share a volume from your system to the container. It can be done by using `-v` when `docker run`.

Let's say I have a `/data/data2services/my-file.txt` on my system, and I want to provide it as a container input file. 
* I need to provide he `-v` flag with paths separated by a `:`
  * before the user provide the path of the shared volume on his system
  * after the user provide the path it will be accessible from in the Docker container
```shell
docker run -it -v /path/on/my/computer:/path/in/container my-container \
	--input-file "/path/in/container/my-file.txt"
```

*  In this example we are sharing the `/data/data2services` volume from our system to `/data` in the Docker container. _my-file.txt_ is then accessible as `/data/my-file.txt` in the container
```shell
docker run -it -v /data/data2services:/data my-container \
	--input-file "/data/my-file.txt"
```

---

## Link and network

Containers can be linked using 2 ways: `--link` flag and `--network`.

### Network

Especially used when running services using docker-compose. The `--link` flag method can be easier to use in simple cases.

#### Example of a network setup in the [docker-compose.yaml](https://github.com/MaastrichtU-IDS/data2services-pipeline/blob/master/docker-compose.yaml)
```yaml
version: "3"
services:
  drill:
    build: ./apache-drill
    volumes:
      - /data:/data:ro
    ports:
      - 8047:8047
      - 31010:31010
    tty: true
    networks:
      - network
  
  graphdb:
    build: ./graphdb
    volumes:
      - /data/graphdb:/opt/graphdb/home
      - /data/graphdb-import:/root/graphdb-import
    ports:
      - 7200:7200
    networks:
      - network
  
networks:
  network:
    driver: bridge
```

#### Example of AutoR2RML connecting to the Drill container through a network
```shell
docker run -it --rm -v /data:/data \
  --network network-pipeline_data2services \
  autor2rml -r \
  -j "jdbc:drill:drillbit=data2services-pipeline_drill_1:31010" \
  -o "/data/data2services/mapping.trig" -d "/data/data2services" -g "http://data2services/graph/autor2rml"
```

---

### Link

`--link` is deprecated, Docker recommends to use `--network`. But the `--link` flag can be more convenient to use in simple case: e.g. when linking to a single service, you just need to provide the container name instead of setting up a whole network.

#### How to use link

Let's say you have a frontend application that needs to query a backend application.

* Run the backend
```shell
docker run -it --rm --name backend -p 8080:8080 backend-image
```

* To access it as http://localhost:8080 in the frontend
```shell
docker run -it --rm --name frontend --link backend:localhost frontend-image
```


* To access it as http://backend:8080 in the frontend
```shell
docker run -it --rm --name frontend --link backend:backend frontend-image
```

* You can link to multiple backend in a frontend
```shell
docker run -it --rm --name frontend --link backend-sql:backend-sql --link backend-redis:backend-redis frontend-image
```


#### Example of AutoR2RML connecting to Drill container using link
```shell
# Run Apache Drill service
docker run -dit --rm -p 8047:8047 -p 31010:31010 --name drill -v /data:/data:ro apache-drill

# Run AutoR2RML, linking to the Apache Drill container
docker run -it --rm --link drill:drill -v /data:/data autor2rml \
	-j "jdbc:drill:drillbit=drill:31010" -r \
        -o "/data/data2services/mapping.trig" -d "/data/data2services" -g "http://data2services/graph/autor2rml"
```