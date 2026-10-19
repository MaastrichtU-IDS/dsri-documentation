FROM alpine:latest

# Install nginx, nginx-dav-ext-module, and apache2-utils
RUN apk add --no-cache \
    nginx \
    nginx-mod-http-dav-ext \
    apache2-utils \
    && rm -rf /var/cache/apk/*

# Create data directory
RUN mkdir -p /data && \
    chown -R nginx:nginx /data && \
    chmod -R 755 /data

# Create directory for auth files
RUN mkdir -p /etc/nginx/auth && \
    chmod 755 /etc/nginx/auth

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
