#!/bin/bash

# To run locally on the server when the docker-compose is down

if [ -z $1 ]; then 
    echo 'Provide the path to a backup file .tar.xz'
    exit 0
fi

sudo rm -rf backup/tmp

sudo tar xf $1
# sudo tar xf backup/backup-2022-01-20.tar.xz -C backup/tmp

docker run --rm -v $(pwd)/backup/tmp:/backup mariadb:10.3 mariabackup --prepare --target-dir=/backup
docker run --rm -v $(pwd)/data:/var/lib/mysql -v $(pwd)/backup/tmp:/backup mariadb:10.3 mariabackup --copy-back --target-dir=/backup

echo "Backup restored, you can now restart MariaDB normally with docker-compose up"