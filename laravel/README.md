```
docker-compose up
docker exec -it laravel bash
php artisan key:generate
php artisan migrate
php artisan db:seed --class=TestDataSeeder
(kann dauern)
php artisan test
```
