#!/bin/bash

# Create a backup with today's timestamp remotely:
ssh ids1 'cd /data/deploy-ids-tests/dsri-documentation ; git pull ; docker-compose exec mysql /app/backup_database.sh'
