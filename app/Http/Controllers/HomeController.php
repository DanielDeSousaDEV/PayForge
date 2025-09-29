<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index (Request $request)
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

        if ($request->filled('paymentProduct')) {
            if ($request->get('paymentProduct') === 'success') {
                session()->flash('flash.type', FlashMessageTypeEnum::SUCCESS);
                session()->flash('flash.message', 'Produto pago com sucesso!');
            } else {
                session()->flash('flash.type', FlashMessageTypeEnum::ERROR);
                session()->flash('flash.message', 'Não foi possível pagar o produto!');
            }
        }

        return Inertia::render('Home', [
            'products' => $products,
            'productsMoreSold' => $productsMoreSold
        ]);
    }
}
