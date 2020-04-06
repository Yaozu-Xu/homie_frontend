FROM nginx

COPY dist/ /usr/share/nginx/html/

COPY nginx/homiepub.com.crt /www/homiepub.com.crt

COPY nginx/homiepub.com.key /www/homiepub.com.key

COPY nginx/default.conf /etc/nginx/conf.d/default.conf