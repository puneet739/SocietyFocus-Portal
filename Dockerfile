FROM nginx:1.14.2

COPY / /usr/share/nginx/html/
ADD nginx_config/start.sh /usr/local/bin/

COPY nginx_config/server/nginx/config/ /etc/nginx/

WORKDIR /etc/nginx 

RUN chown -R nginx /usr/share/nginx/html && \
	chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]