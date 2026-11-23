FROM php:8.2-apache

RUN docker-php-ext-install mysqli

RUN sed -i -e 's/^ServerTokens .*/ServerTokens Prod/' \
           -e 's/^ServerSignature .*/ServerSignature Off/' \
           /etc/apache2/conf-available/security.conf \
 && printf 'expose_php = Off\ndisplay_errors = Off\nlog_errors = On\n' \
           > /usr/local/etc/php/conf.d/zz-security.ini

COPY --exclude=Dockerfile --exclude=*.md . /var/www/html/