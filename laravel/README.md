```
docker-compose up
docker exec laravel -it bash
php artisan key:generate
php artisan migrate
php artisan db:seed --class=TestDataSeeder
(kann dauern)
php artisan test
```
