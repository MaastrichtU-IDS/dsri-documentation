#!/bin/bash

# Required to pass env var in the CRON job: https://roboslang.blog/post/2017-12-06-cron-docker/
printenv | sed 's/^\(.*\)$/export \1/g' > /.env.sh
chmod +x /.env.sh

# Using this method seems to fail silently: https://stackoverflow.com/questions/27771781/how-can-i-access-docker-set-environment-variables-from-a-cron-job
# declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env
# printenv | grep -v "no_proxy" >> /etc/environment



echo "🤖📆 Starting CRON job"

cron -f
