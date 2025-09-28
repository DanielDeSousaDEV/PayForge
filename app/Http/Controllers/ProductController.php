<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Http\Requests\Product\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\StripeClient;

class ProductController extends Controller
{   
    private StripeClient $StripeClient;

    public function __construct() 
    {
        $this->StripeClient = new StripeClient(config('cashier.secret'));
    }

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
            
        if (!$user->is_admin) {
            return to_route('home')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Você não possui permissão para acessar essa área');
        }

        $productsPagination = Product::paginate(5);

        return Inertia::render('ProductsPanel', [
            'productsPagination' => $productsPagination
        ]);
    }

    function storeProduct (StoreProductRequest $request)
    {
        try {
            $user = Auth::user();
    
            if (!$user) {
                return to_route('login')
                    ->with('flash.type', FlashMessageTypeEnum::ERROR)
                    ->with('flash.message', 'Usuário não atenticado');
            }
                
            if (!$user->is_admin) {
                return to_route('home')
                    ->with('flash.type', FlashMessageTypeEnum::ERROR)
                    ->with('flash.message', 'Você não possui permissão para acessar essa área');
            }
    
            $validatedData = $request->validated();
    
            $productData = Arr::except($validatedData, [
                'preview_image',
                'images'
            ]);
            
            
            // Criação no sistema
            $product = Product::create($productData);
    
            if ($request->hasFile('preview_image')) {
                $previewImage = $request->file('preview_image');
    
                $imageName = $product->id . '.' . $previewImage->extension();
    
                $previewImagePath = Storage::putFileAs('preview', $previewImage, $imageName);
            }
    
            if (!$previewImagePath) {
                // Adiciona mensagem na sessão sem redirecionar
                session()->flash('flash.type', FlashMessageTypeEnum::ERROR);
                session()->flash('flash.message', 'Não foi possível salvar a imagem!');
    
                return back();
            }
    
            $imagesUrls = [];
    
            foreach ($validatedData['images'] as $index => $image) {
    
                $imageName = $index . '.' . $image->extension();
    
                $imagePath = Storage::putFileAs('products/' . $product->id, $image, $imageName);
        
                if (!$imagePath) {
                    continue;
                }
    
                $imagesUrls[] = Storage::url($imagePath);
            }
    
            $product->update([
                'preview_url' => Storage::url($previewImagePath),
                'images' => $imagesUrls
            ]);

            // Criação no Stripe
            $stripeProduct = $this->StripeClient->products->create([
                'name' => $productData['name'],
                'description' => $productData['description'] ?? '',
                'images' => $imagesUrls,
                'metadata' => [
                    'system_id' => $product->id
                ]
            ]);

            $stripePrice = $this->StripeClient->prices->create([
                'product' => $stripeProduct->id,
                'currency' => config('cashier.currency', 'brl'),
                'unit_amount' => intval($productData['price'] * 100)
            ]);

            // Atualização do produto do sistema
            $product->update([
                'stripe_product_id' => $stripeProduct->id,
                'stripe_price_id' => $stripePrice->id,
            ]);

            // Adiciona mensagem na sessão sem redirecionar
            session()->flash('flash.type', FlashMessageTypeEnum::SUCCESS);
            session()->flash('flash.message', 'Produto criado com sucesso!');
    
            return back();
        } catch (\Throwable $th) {
            // Adiciona mensagem na sessão sem redirecionar
            session()->flash('flash.type', FlashMessageTypeEnum::ERROR);
            session()->flash('flash.message', 'Não foi possível criar o produto!'. $th->getMessage() . '/'. $th->getLine() . '/' . $th->getFile());
    
            return back();
        }
    }

    function destroy ($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return back()
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Não foi possível achar o produto');
        }

        try {
    
            // Desativa os preços
            $stripePrices = $this->StripeClient->prices->all([
                'product' => $product->stripe_product_id,
            ]);

            foreach ($stripePrices->data as $price) {
                $this->StripeClient->prices->update($price->id, [
                    'active' => false    
                ]);
            }


            // Desativa o produto
            $this->StripeClient->products->update($product->stripe_product_id, [
                'active' => false
            ]);


            $product->delete();
    
            return back()   
                ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
                ->with('flash.message', 'Produto excluido com sucesso!');

        } catch (\Throwable $th) {
            return back()   
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Ocorreu um erro ao deletar o produto!');
        }

    }
}
