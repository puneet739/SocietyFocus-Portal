FROM nginx:1.14.2

COPY / /usr/share/nginx/html/

COPY nginx_config/server/nginx/config/ /etc/nginx/

RUN chown -R nginx /usr/share/nginx/html