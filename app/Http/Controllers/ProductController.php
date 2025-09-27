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

        // Adiciona mensagem na sessão sem redirecionar
        session()->flash('flash.type', FlashMessageTypeEnum::SUCCESS);
        session()->flash('flash.message', 'Produto criado com sucesso!');

        return back(); // retorna o produto diretamente
    }

    function destroy ($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return back()
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Não foi possível achar o produto');
        }

        $product->delete();

        return back()   
            ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
            ->with('flash.message', 'Produto excluido com sucesso!');
    }
}
