<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Http\Requests\Cart\AddProductToCartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    function show(Request $request)
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
            ->where('alredy_paid', false)
            ->first();

        if ($request->filled('paymentCart')) {
            if ($request->get('paymentCart') === 'success') {
                session()->flash('flash.type', FlashMessageTypeEnum::SUCCESS);
                session()->flash('flash.message', 'Carrinho pago com sucesso!');
            } else {
                session()->flash('flash.type', FlashMessageTypeEnum::ERROR);
                session()->flash('flash.message', 'Não foi possível pagar o carrinho!');
            }
        }

        return Inertia::render('Cart', [
            'cart' => $userActiveCart
        ]);
    }

    function addProduct(AddProductToCartRequest $request, $id)
    {
        try {
            DB::beginTransaction();

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
                ->where('alredy_paid', false)
                ->first();

            $cartToAddProduct = null;

            if ($userActiveCart) {
                $cartToAddProduct = $userActiveCart;
            } else {
                $cartToAddProduct = Cart::create([
                    'user_id' => $user->id,
                    'total_cost' => $product->price,
                    'alredy_paid' => false
                ]);
            }

            $productQuantity = $request->validated()['quantity'];

            $cartToAddProduct->products()->syncWithoutDetaching([
                $product->id => ['quantity' => $productQuantity]
            ]);

            DB::commit();

            return to_route('cart')
                ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
                ->with('flash.message', 'Produto adicionado com sucesso.');;

        } catch (\Throwable $th) {
            DB::rollBack();

            return to_route('home')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Tente novamente mais tarde'. $th->getMessage());
        }
        
    }

    function payCart()
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();
    
            if (!$user) {
                return to_route('login')
                    ->with('flash.type', FlashMessageTypeEnum::ERROR)
                    ->with('flash.message', 'Usuário não atenticado');
            }
            
            $userActiveCart = Cart::query()
                    ->with('products')
                    ->where('user_id', $user->id)
                    ->where('alredy_paid', false)
                    ->first();
    
            if ($userActiveCart->products->count() < 1) {
                back()
                    ->with('flash.type', FlashMessageTypeEnum::ERROR)
                    ->with('flash.message', 'Você não pode pagar um carrinho vazio');
            }
    
            $stripeProductsData = [];
    
            foreach ($userActiveCart->products as $product) {
                $stripeProductsData[$product->stripe_price_id] = $product->pivot->quantity;
            }
    
    
            $checkout = $user->checkout($stripeProductsData, [
                'success_url' => route('cart', [
                    'paymentCart' => 'success'
                ]),
                'cancel_url' => route('cart', [
                    'paymentCart' => 'failed'
                ]),
                'metadata'    => [
                    'cart_id' => $userActiveCart->id,
                    'user_id' => $user->id,
                ],
                'payment_intent_data' => [
                    'metadata' => [
                        'cart_id' => $userActiveCart->id,
                        'user_id' => $user->id,
                    ],
                ],
            ]);
            
            DB::commit();

            return Inertia::location($checkout->redirect());
        } catch (\Throwable $th) {
            DB::rollBack();
            
            // Adiciona mensagem na sessão sem redirecionar
            session()->flash('flash.type', FlashMessageTypeEnum::ERROR);
            session()->flash('flash.message', 'Não foi possível criar o pagar o carrinho!'. $th->getMessage() . '/'. $th->getLine() . '/' . $th->getFile());
    
            return back();
        }
    }
}
