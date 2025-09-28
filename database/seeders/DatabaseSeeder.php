<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Gabriel',
            'email' => 'gabriel.dev@gmail.com',
            'password' => 'Admin@123',
            'is_admin' => true
        ]);

        User::factory()->create([
            'name' => 'Daniel',
            'email' => 'daniel.dev@gmail.com',
            'password' => 'Owner@123',
        ]);

        $users = User::all();

        $products = Product::factory(10)
            ->create();

        $users->each(function ($user) use ($products) {
            $totalOfCarts = rand(2, 5);

            $carts = Cart::factory($totalOfCarts)
                ->create([
                    'user_id' => $user->id,
                    'alredy_paid' => true
                ]);

            $lastCart = $carts->last();

            $lastCart->update([
                'alredy_paid' => fake()->boolean(25)
            ]);
            
            $carts->each(function ($cart) use ($products) {
                $totalOfProducts = rand(2, 5);

                $syncProductsData = $products->random($totalOfProducts)->mapWithKeys(function ($product) {
                    return [
                        $product->id => [
                            'quantity' => rand(2, 6)
                        ]
                    ];
                });

                $cart->products()->sync($syncProductsData);
            });
        });
        
    }
}
