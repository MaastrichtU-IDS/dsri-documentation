# Astuto docker

## How-to run
```bash
docker compose up -d --force-recreate
```

## Example .env file
```bash
# Versions
VERSION_REDIS=7
VERSION_POSTGRES=14.5
# Versioning unfortunately doesn't exist at Astuto HQ
# https://hub.docker.com/r/riggraz/astuto/tags
VERSION_ASTUTO=2290cff5079e046e9484f6360f03413a1b436412

REDIS_URL=redis://redis:6379/0
REDIS_PASSWORD=redispassword
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgrespassword
# You can create this key base using the following link: https://www.grc.com/passwords.htm
# Do not use this key base outside of testing purposes as it is not deemed secure anymore.
SECRET_KEY_BASE=99A8B5170B658E4FBF2A3DCC30C40C4382F6565D3DD9E5EA9B26515700612AFB

# Email
EMAIL_DELIVERY_METHOD=smtp
EMAIL_SMTP_TLS=false
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=25
EMAIL_MAIL_FROM=example@example.com
EMAIL_MAIL_REPLY_TO=example@example.com
```