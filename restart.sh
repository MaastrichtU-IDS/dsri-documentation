#!/bin/bash

# Script to restart the stack directly from the server where it is deployed

git pull

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --force-recreate --build -d

