<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    function show()
    {
        $user = Auth::user();

        if (!$user) {
            return to_route('login')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Usuário não atenticado');
        }

        $userActiveCart = Cart::query()
            ->with('products')
            ->where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        return Inertia::render('Cart', [
            'cart' => $userActiveCart
        ]);
    }

    function addProduct($id)
    {
        try {
            $user = Auth::user();

            $product = Product::find($id);

            if (!$product) {
                return to_route('home')
                    ->with('flash.type', FlashMessageTypeEnum::DANGER)
                    ->with('flash.message', 'Não foi possível achar o produto');
            }

            if (!$user) {
                return to_route('login')
                    ->with('flash.type', FlashMessageTypeEnum::ERROR)
                    ->with('flash.message', 'Usuário não atenticado');
            }

            $userActiveCart = Cart::query()
                ->where('user_id', $user->id)
                ->where('is_active', true)
                ->first();

            $cartToAddProduct = null;

            if ($userActiveCart) {
                $cartToAddProduct = $userActiveCart;
            } else {
                $cartToAddProduct = Cart::create([
                    'user_id' => $user->id,
                    'total_cost' => $product->price,
                    'is_active' => true
                ]);
            }

            $cartToAddProduct->products()->syncWithoutDetaching([
                $product->id => ['quantity' => 5]
            ]);

            return to_route('cart')
                ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
                ->with('flash.message', 'Produto adicionado com sucesso.');;

        } catch (\Throwable $th) {
            return to_route('home')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Tente novamente mais tarde'. $th->getMessage());
        }
        
    }
}
