FROM php:8.2-fpm

WORKDIR /var/www/html/app

RUN apt-get update && apt-get install -y curl vim unzip

# Add and enable PHP-PDO
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN docker-php-ext-enable pdo_mysql

# Install composer
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

RUN usermod -u 1000 www-data

COPY --chown=www-data:www-data . /var/www/html/app

USER www-data

EXPOSE 9000

CMD ["php-fpm"]