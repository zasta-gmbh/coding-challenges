# setting the direct debian version to avoid accidential breaking updates
FROM php:7.4-cli-buster
COPY . /var/www
WORKDIR /var/www
RUN apt-get update && apt-get install -y \
    build-essential \
    mariadb-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl
# Additional Libraries that are missing in debian buster but needed for mbstring and zip
RUN apt-get install -y libonig-dev libzip-dev
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install
