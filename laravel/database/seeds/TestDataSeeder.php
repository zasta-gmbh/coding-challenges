<?php

use App\Customer;
use App\Order;
use Faker as Faker;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

        $faker = Faker\Factory::create();
        $total = 1000;
        for ($i = 1; $i <= $total ; $i++){
            $customer = new Customer;
            $customer->name = $faker->name;
            $customer->save();
            echo $i, '/', $total . PHP_EOL;

            for ($k = 0; $k < 10; $k++){
                $order = new Order();
                $order->customer_id = $customer->id;
                $order->description = $faker->text;
                $order->total_in_cent = $faker->numberBetween(100, 10000);
                $order->save();
            }
        }
    }
}
