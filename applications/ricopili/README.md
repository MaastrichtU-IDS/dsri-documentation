# Ricopili deployment

Switch to project if necessary:

```bash
oc project dms-gwas
```

### Deploy

```bash
oc apply -f pod-ricopili-dms.yml
```

### Delete

```bash
oc delete -f pod-ricopili-dms.yml
```

### Check status

```bash
oc get pod ricopili-dms-gwas
```

### Source code

* https://hub.docker.com/r/bruggerk/ricopili 
  * Home in `/ricopili`

* https://github.com/beeemT/ricopili-docker 

* https://github.com/Ripkelab/ricopili/wiki

### Test with Docker

```bash
docker run -v /data/test:/data --entrypoint="tail -f /dev/null" bruggerk/ricopili:latest
```

