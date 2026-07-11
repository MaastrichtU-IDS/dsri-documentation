#!/bin/sh
set -e

echo "Starting WebDAV server entrypoint..."

# Default credentials if not provided
WEBDAV_USERNAME=${WEBDAV_USERNAME:-webdav}
WEBDAV_PASSWORD=${WEBDAV_PASSWORD:-changeme}

# Create htpasswd file with provided credentials
echo "Setting up WebDAV authentication for user: $WEBDAV_USERNAME"
htpasswd -bc /etc/nginx/auth/.htpasswd "$WEBDAV_USERNAME" "$WEBDAV_PASSWORD"

# Ensure proper permissions on auth directory
chmod 644 /etc/nginx/auth/.htpasswd || echo "Warning: Could not set permissions on htpasswd file"

# Ensure data directory exists
mkdir -p /data || echo "Warning: Could not create /data directory"

# Try to set permissions on data directory (may fail if not root, that's ok)
chown -R nginx:nginx /data 2>/dev/null || echo "Warning: Could not chown /data (not running as root?)"
chmod -R 755 /data 2>/dev/null || echo "Warning: Could not chmod /data"

# Create client body temp directory
mkdir -p /tmp/nginx_client_temp
chown -R nginx:nginx /tmp/nginx_client_temp 2>/dev/null || echo "Warning: Could not chown temp directory"

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t

echo "WebDAV server configuration complete!"
echo "Starting nginx..."

# Execute the main command
exec "$@"
