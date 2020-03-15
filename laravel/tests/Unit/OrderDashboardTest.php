<?php


namespace Tests\Unit;


use App\Libs\OrderDashboard;
use Tests\TestCase;

class OrderDashboardTest extends TestCase
{
    public function testDashboard(){
        $dashboard = new OrderDashboard;
        $dashboard->abcAnalysis();
    }
}
