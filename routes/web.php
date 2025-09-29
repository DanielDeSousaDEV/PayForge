<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\HandleAdminResquests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
    
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});


Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/product/{id}', [ProductController::class, 'productDetails'])->name('product');
    Route::post('/product/{id}/buy', [ProductController::class, 'buyProduct'])->name('product.buy');

    Route::get('/cart', [CartController::class, 'show'])->name('cart');
    Route::post('/cart/{id}/add', [CartController::class, 'addProduct'])->name('cart.add');
    Route::post('/cart/{id}/pay', [CartController::class, 'payCart'])->name('cart.pay');

    Route::get('/profile', [AuthController::class, 'showProfile'])->name('profile');
    Route::post('/profile', [AuthController::class, 'updateProfile'])->name('profile.update');
    Route::delete('/profile', [AuthController::class, 'deleteMe'])->name('profile.delete');

    Route::middleware(HandleAdminResquests::class)
        ->prefix('admin')
        ->group(function () {
            Route::get('/products', [ProductController::class, 'showProductsPanel'])->name('admin.products');
            Route::post('/products', [ProductController::class, 'storeProduct'])->name('admin.products.store');
            Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
        
            Route::get('/users', [UserController::class, 'showUsersPanel'])->name('admin.users');
            Route::post('/users', [UserController::class, 'storeUser'])->name('admin.users.store');
            Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        });
});



Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])->name('stripe.webhook');


Route::get('/log', fn () => Auth::loginUsingId(5));
Route::get('/logout', fn () => Auth::logout());