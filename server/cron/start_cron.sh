#!/bin/bash

# TODO: checkout https://github.com/binxio/blog-cron-supervisor-docker

# Required to pass env var in the CRON job
# https://stackoverflow.com/questions/27771781/how-can-i-access-docker-set-environment-variables-from-a-cron-job
# https://roboslang.blog/post/2017-12-06-cron-docker/
# declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

# printenv | grep -v "no_proxy" >> /etc/environment

# scriptPath=$(dirname "$(readlink -f "$0")")

# Exporting environment variable
printenv | sed 's/^\(.*\)$/export \1/g' > /.env.sh
chmod +x /.env.sh

echo "🤖📆 Starting CRON job"

cron -f
