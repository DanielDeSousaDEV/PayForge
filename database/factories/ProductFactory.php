<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalOfImages = rand(2, 6);

        $images = [];

        for ($c = 0; $totalOfImages > $c; $c++) {
            $word = fake()->word();

            $images[] = 'https://placehold.co/300x150?text=' . $word;
        }

        $productName = fake()->words(2);

        return [
            'name' => implode(' ', $productName),
            'rating' => fake()->randomFloat(1, 0, 5),
            'preview_url' => 'https://placehold.co/400x400?text=' . strtoupper($productName[0][0] . '+' . $productName[1][0]),
            'price' => fake()->randomFloat(2, 0, 500),
            'description' => fake()->sentence(variableNbWords: false),
            'images' => $images
        ];
    }
}
