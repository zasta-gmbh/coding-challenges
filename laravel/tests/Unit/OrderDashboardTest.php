<?php


namespace Tests\Unit;


use App\Libs\OrderDashboard;
use App\Customer;
use App\Order;
use Tests\TestCase;

class OrderDashboardTest extends TestCase
{

    public function testDashboard(){
        $dashboard = new OrderDashboard;
        $analysis = $dashboard->abcAnalysis();

        $totalCustomers = Customer::count();
        $this->assertEquals(count($analysis['top20Customers']), intval($totalCustomers * 0.2));

        $actualShare = $dashboard->shareOfTotalRevenue($analysis['top80PercentCustomers']);
        $this->assertGreaterThanOrEqual(0.8, $actualShare);
        $actualShareDB = $dashboard->shareOfTotalRevenue($analysis['top80PercentCustomersDB']);
        $this->assertGreaterThanOrEqual(0.8, $actualShareDB);

        $this->assertEquals(count($analysis['top80PercentCustomersDB']), count($analysis['top80PercentCustomers']));

    }
}
