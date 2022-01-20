#!/bin/bash

chown mysql: /backup

mariabackup --backup --target-dir=/backup --user=root --password=$PASSWORD

tar --create --xz --file - /backup > backup.tar.xz

printf -v date '%(%Y-%m-%d)T\n' -1 

mv backup.tar.xz backup-$date.tar.xz
