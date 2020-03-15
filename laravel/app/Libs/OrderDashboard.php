<?php


namespace App\Libs;


use App\Customer;
use App\Order;
use Illuminate\Support\Facades\DB;

class OrderDashboard
{

    protected function getTop20Customers(){
        $first20PercentLimit = Customer::query()->count() * 0.2;

        return (new Order)
            ->select('customer_id', DB::raw('sum(total_in_cent) as total'))
            ->groupBy('customer_id')
            ->orderBy('total', 'desc')
            ->limit($first20PercentLimit)
            ->get();
    }

    public function abcAnalysis(){
        // calculate top 20 percent of all customers
        $top20 = $this->getTop20Customers();
        // calculate share of total revenue for the top 20 percent customers
        // get the smallest list of customers that generate 80 percent of the revenue
    }

}
