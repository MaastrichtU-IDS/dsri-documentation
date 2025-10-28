# WebDAV Server

A secure nginx-based WebDAV server for the DSRI platform. This provides WebDAV protocol access to files stored in your persistent volume.

## Features

- Based on nginx Alpine with the official DAV extension module
- HTTP Basic Authentication for security
- Support for all standard WebDAV methods (GET, PUT, DELETE, MKCOL, COPY, MOVE, PROPFIND)
- Health check endpoint for monitoring
- CORS support for web clients
- Configurable via environment variables

## Building the Docker Image

Build the image locally:

```bash
docker build -t webdav:latest .
```

Or build and push to GitHub Container Registry:

```bash
# Build for your platform
docker build -t ghcr.io/maastrichtu-ids/webdav:latest .

# Push to registry
docker push ghcr.io/maastrichtu-ids/webdav:latest
```

For multi-platform builds:

```bash
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 \
  -t ghcr.io/maastrichtu-ids/webdav:latest \
  --push .
```

## Building on OpenShift

You can build the image directly on OpenShift:

```bash
# Create a new build
oc new-build --name webdav --binary

# Start the build from the current directory
oc start-build webdav --from-dir=. --follow --wait

# Tag the image
oc tag webdav:latest webdav:v1.0
```

## Deploying to DSRI

### Using the OpenShift Web Console

1. Go to the DSRI OpenShift web console
2. Navigate to your project
3. Click on "Add" → "From Catalog"
4. Search for "WebDAV"
5. Fill in the parameters:
   - **Application name**: Choose a unique name (e.g., `webdav`)
   - **WebDAV username**: Your desired username
   - **WebDAV password**: A strong password
   - **Storage name**: The name of your existing Persistent Volume Claim
   - **Storage folder**: (Optional) Subfolder within the PVC to expose

### Using the Command Line

First, apply the template to your project:

```bash
oc apply -f ../templates/template-webdav.yml
```

Then create an app from the template:

```bash
oc new-app webdav \
  -p APPLICATION_NAME=my-webdav \
  -p WEBDAV_USERNAME=myuser \
  -p WEBDAV_PASSWORD=mypassword \
  -p STORAGE_NAME=my-storage-pvc
```

## Using the WebDAV Server

### Get the Route URL

```bash
oc get route webdav -o jsonpath='{.spec.host}'
```

### Access via Command Line

Upload a file with curl:

```bash
curl -u username:password -T myfile.txt https://your-webdav-url/myfile.txt
```

Download a file:

```bash
curl -u username:password https://your-webdav-url/myfile.txt -o myfile.txt
```

List directory contents:

```bash
curl -u username:password -X PROPFIND https://your-webdav-url/
```

### Mount as Network Drive

#### Linux

Install davfs2:

```bash
sudo apt-get install davfs2  # Debian/Ubuntu
sudo yum install davfs2      # RHEL/CentOS
```

Mount the WebDAV share:

```bash
sudo mount -t davfs https://your-webdav-url /mnt/webdav
```

Or add to `/etc/fstab` for persistent mounting:

```
https://your-webdav-url /mnt/webdav davfs user,noauto 0 0
```

#### macOS

Use Finder:
1. Open Finder
2. Press `Cmd + K` (or Go → Connect to Server)
3. Enter: `https://your-webdav-url`
4. Click Connect and enter your credentials

Or via command line:

```bash
mount -t webdav https://your-webdav-url /Volumes/webdav
```

#### Windows

1. Right-click on "This PC" or "My Computer"
2. Select "Map network drive"
3. Choose a drive letter
4. Enter: `https://your-webdav-url`
5. Check "Connect using different credentials"
6. Enter your username and password

### WebDAV Clients

Popular WebDAV clients:

- **Cyberduck** (Windows, macOS) - https://cyberduck.io/
- **WinSCP** (Windows) - https://winscp.net/
- **Cadaver** (Linux command line) - `sudo apt-get install cadaver`
- **davfs2** (Linux mount) - `sudo apt-get install davfs2`

## Configuration

The WebDAV server is configured via environment variables:

- `WEBDAV_USERNAME`: Username for authentication (default: `webdav`)
- `WEBDAV_PASSWORD`: Password for authentication (default: `changeme`)

These are automatically set from the OpenShift Secret when deploying via the template.

## Security Considerations

1. **Always use HTTPS**: The OpenShift route is configured with TLS termination
2. **Use strong passwords**: Avoid default passwords in production
3. **Limit access**: Use OpenShift RBAC to control who can deploy WebDAV servers
4. **Monitor access**: Check nginx access logs for suspicious activity

## Troubleshooting

### Check logs

```bash
oc logs -f deployment/webdav
```

### Check if the pod is running

```bash
oc get pods -l app=webdav
```

### Test the health endpoint

```bash
curl https://your-webdav-url/health
```

### Common issues

1. **Authentication fails**: Double-check username and password in the secret
2. **Cannot write files**: Ensure the PVC is mounted correctly and has write permissions
3. **Connection timeout**: Check if the route exists and is accessible

## Deleting the Application

To remove the WebDAV server:

```bash
oc delete all,secret,configmaps,serviceaccount,rolebinding -l app=webdav
```

Replace `webdav` with your APPLICATION_NAME if different.

## Technical Details

- **Base Image**: nginx:alpine
- **WebDAV Module**: nginx-mod-http-dav-ext
- **Authentication**: HTTP Basic Auth via htpasswd
- **Port**: 80 (HTTP inside container, HTTPS via OpenShift route)
- **Data Directory**: `/data` (mounted from PVC)
- **Health Check**: `/health` endpoint

## License

This is part of the DSRI documentation and templates maintained by the Institute of Data Science at Maastricht University.
