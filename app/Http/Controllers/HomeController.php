<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index ()
    {
        $products = Product::query()
            ->limit(20)
            ->get();

        $productsMoreSold = 
            fn () => Product::query()
                ->withCount('carts')
                ->orderByDesc('carts_count')
                ->limit(10)
                ->get();

        return Inertia::render('Home', [
            'products' => $products,
            'productsMoreSold' => $productsMoreSold
        ]);
    }
}
