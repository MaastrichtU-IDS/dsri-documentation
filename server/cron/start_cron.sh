#!/bin/bash

# TODO: checkout https://github.com/binxio/blog-cron-supervisor-docker

# Required to pass env var in the CRON job
declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

echo "🤖📆 Starting CRON job"

cron -f
