FROM php:8.1-apache

RUN docker-php-ext-install mysqli

COPY --exclude=Dockerfile --exclude=*.md . /var/www/html/
