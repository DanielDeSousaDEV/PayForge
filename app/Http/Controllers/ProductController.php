<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    function buyProduct (int $id)
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

    function showProductsPanel ()
    {
        $user = Auth::user();

        if (!$user) {
            return to_route('login')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Usuário não atenticado');
        }

        $productsPagination = Product::paginate(1);



        return Inertia::render('ProductsPanel', [
            'productsPagination' => $productsPagination
        ]);
    }
}
