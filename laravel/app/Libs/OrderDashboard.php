<?php


namespace App\Libs;


use App\Customer;
use App\Order;
use Illuminate\Support\Facades\DB;

class OrderDashboard
{

    public function getTopXCustomers($percentage=0.2){
        $firstXPercentLimit = Customer::query()->count() * $percentage;

        return Order::select('customer_id', DB::raw('sum(total_in_cent) as total'))
            ->groupBy('customer_id')
            ->orderBy('total', 'desc')
            ->limit($firstXPercentLimit)
            ->pluck('customer_id')
            ->toArray();
    }

    public function shareOfTotalRevenue($customers){

        $customer_total = Order::whereIn('customer_id', $customers)->sum('total_in_cent');
        $total = Order::sum('total_in_cent');

        return $customer_total / $total;
    }

    public function customersByOverallShares($percentage=0.8){

        // This could also be done with Windowing or running total in database
        // But the heavy hitter, the subsumming of the customer orders is already done in the Database
        // calculating the running total in php shouldn't be that expansive
        // The benefit is that the code is easier to understand and to care for

        $total = Order::sum('total_in_cent');
        $runningTotal = 0;
        $customers = [];

        $ordersByCustomers = Order::select('customer_id', DB::raw('sum(total_in_cent) as total'))
            ->groupBy('customer_id')
            ->orderBy('total', 'desc')
            ->get();

        foreach ($ordersByCustomers as $customer) {
            $runningTotal += $customer->total;
            $customers[] = $customer->customer_id;
            if ($runningTotal > $percentage * $total){
              break;
            }
        }

        return $customers;
    }

    public function customersByOverallSharesDB($percentage=0.8){

      // sadly, sadly mysql starts to support windowing sum at version 8 and not 5

      // in mysql 8 it could look like this, but I didn't test this particular sql
      // it is just a conversion with help of the docs
      // with totals as (
      //   select
      //     customer_id,
      //     sum(total_in_cent) as total
      //   from orders
      //   group by customer_id
      //   order by total desc
      // )
      //
      // select
      //   customer_id,
      //   total,
      //   sum(total) over (order by total desc) as cumulative_sum
      // from totals
      // having cumulative_sum <= :$threshold
      // order by cumulative_sum;


      $threshold = Order::sum('total_in_cent') * $percentage;

      // yeah, sql variables, stuff everybody dreams of ...
      $query = DB::select("SELECT
        t.customer_id, t.total,
        @running_total:=@running_total + t.total AS cumulative_total
        FROM
        ( SELECT
            customer_id,
            sum(total_in_cent) as total
            FROM orders
            GROUP BY customer_id
            ORDER BY total DESC ) t
        JOIN (SELECT @running_total:=0) r
        HAVING cumulative_total <= :threshold
        ORDER BY cumulative_total;",
        [
          'threshold'=>$threshold
        ]
      );

      $customers = [];
      foreach ($query as $customer) {
          $customers[] = $customer->customer_id;
      }

      return $customers;

    }

    public function abcAnalysis(){
        // calculate top 20 percent of all customers
        // calculate share of total revenue for the top 20 percent customers
        // get the smallest list of customers that generate 80 percent of the revenue

        $top20Customers = $this->getTopXCustomers();
        $top20shares = $this->shareOfTotalRevenue($top20Customers);
        $customersGenerating80PercentShare = $this->customersByOverallShares();
        // this is not exactly the smallest list of customers
        // normally this could overshoot the given percentage by a slight amount
        // but for the purpose of an ABC analysis this is in my eyes suitable
        // otherwise I had to look for customer totals that are small enough to fit in to fill the 80%
        // and this in an minimizing manner
        // this would be a subset sum problem and that is way to overkill for such kind of analysis

        $customersGenerating80PercentShareDB = $this->customersByOverallSharesDB();
        // this could undershoot the customer list slightly
        // could be adjusted but that depends on the data itself and is also not realy helpful for a fast analysis

        return [
          "top20Customers"=>$top20Customers,
          "top20Shares"=>$top20shares,
          "top80PercentCustomers"=>$customersGenerating80PercentShare,
          "top80PercentCustomersDB"=>$customersGenerating80PercentShare
        ];

    }

}
