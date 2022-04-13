#!/bin/bash

## Use cache:
ssh ids1 'cd /data/deploy-services/dsri-documentation ; git pull ; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --force-recreate --build -d'

## Build without cache:
# ssh ids1 'cd /data/deploy-services/dsri-documentation ; git pull ; docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache ; docker-compose down ; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d'
