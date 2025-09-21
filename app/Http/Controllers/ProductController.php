<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    function show (int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return Inertia::render('Home')
                ->with('flash.type', FlashMessageTypeEnum::DANGER)
                ->with('flash.message', 'Não foi possível encontrar o produto');
        }

        $recomendedProducts = fn () => 
            Product::query()
                ->orderByDesc('created_at')
                ->limit(5)
                ->get();

        return Inertia::render('BuyProduct', [
            'product' => $product,
            'recomendedProducts' => $recomendedProducts,
        ]);
    }
}
