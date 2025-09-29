<?php

namespace App\Http\Controllers;

use App\Mail\PaymentSuccessful;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Http\Controllers\WebhookController;
use Stripe\StripeClient;

class StripeWebhookController extends WebhookController
{
    function handlePaymentIntentSucceeded (array $payload)
    {
        $metadata = $payload['data']['object']['metadata'];

        $userId = $metadata['user_id'] ?? null;
        $cartId = $metadata['cart_id'] ?? null;

        $cart = Cart::find($cartId);

        if ($cart && !$cart->alredy_paid) {
            $cart->update([
                'alredy_paid' => true
            ]);

            Log::info('Carrinho pago', [
                'user_id' => $userId ?? 'N/A',
                'cart_id' => $cartId ?? 'N/A'
            ]);

            $user = User::find($userId);

            if ($user) {
                $chargeId =  $payload['data']['object']['latest_charge'];

                $stripe = new StripeClient(config('cashier.secret'));

                $charge = $stripe->charges->retrieve($chargeId);

                $receiptUrl = $charge?->receipt_url ?? null;

                Mail::to($user)
                    ->queue(new PaymentSuccessful($cart, $receiptUrl));
            }
        }
    }
}
