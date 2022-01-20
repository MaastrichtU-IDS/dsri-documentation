#!/bin/bash

## Use a script?
# docker-compose exec mysql /app/backup_database.sh

docker-compose exec mysql chown mysql: /backup

docker-compose exec --user mysql mysql mariabackup --backup --target-dir=/backup --user=root --password=$PASSWORD

docker-compose exec --user mysql mysql tar --create --xz --file - /backup > backup.tar.xz

printf -v date '%(%Y-%m-%d)T\n' -1 

mv backup/backup.tar.xz /data/backup/dsri-db/backup-$date.tar.xz

## Remotely:
# ssh ids1 'cd /data/deploy-ids-tests/dsri-documentation ; git pull ; docker-compose exec mysql chown mysql: /backup'
