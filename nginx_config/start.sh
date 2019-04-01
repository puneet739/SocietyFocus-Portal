#!/bin/bash

sed -i "s/__ZIRCON_API_IP__/$ZIRCON_API_IP/g" /etc/nginx/nginx.conf
sed -i "s/__ZIRCON_API_PORT__/$ZIRCON_API_PORT/g" /etc/nginx/nginx.conf


cat /etc/nginx/nginx.conf


# Run nginx
nginx -g 'daemon off;'