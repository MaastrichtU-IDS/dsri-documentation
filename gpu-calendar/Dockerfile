FROM php:8.2-apache

RUN docker-php-ext-install mysqli

COPY --exclude=Dockerfile --exclude=*.md . /var/www/html/