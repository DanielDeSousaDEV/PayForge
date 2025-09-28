<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Http\Controllers\WebhookController;

class StripeWebhookController extends WebhookController
{
    function handlePaymentIntentSucceeded (array $payload)
    {
        $metadata = $payload['data']['object']['metadata'];

        $userId = $metadata['user_id'];
        $cartId = $metadata['cart_id'];

        $cart = Cart::find($cartId);

        if ($cart) {
            $cart->update([
                'alredy_paid' => true
            ]);

            Log::info('Carrinho pago', [
                'user_id' => $userId ?? 'N/A',
                'cart_id' => $cartId ?? 'N/A'
            ]);
        }
    }
}
