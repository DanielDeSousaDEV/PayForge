<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showProfile()
    {
        $user = Auth::user();

        if (!$user) {
            return to_route('login')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Usuário não atenticado');
        }

        $carts = fn () => 
            Cart::query()
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('Profile', [
            'carts' => $carts
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        $user->update($request->validated());

        return Inertia::render('Profile')
            ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
            ->with('flash.message', 'Perfil atualizado com sucesso');
    }

    public function login (LoginRequest $request)
    {

        $logged = Auth::attempt([
            'email' => $request['email'],
            'password' => $request['password'],
        ], true);

        if (!$logged) {
            return back()->withErrors([
                'email' => 'Credenciais invalidas'
            ]);
        }
        
        return to_route('home');
    }
    
    public function showLogin ()
    {
        return Inertia::render('auth/Login');
    }

    public function register (RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => $request['password'],
        ]);

        Auth::loginUsingId($user->id, true);

        return to_route('home');
    }
    public function showRegister ()
    {
        return Inertia::render('auth/Register');
    }

    public function deleteMe ()
    {
        $user = Auth::user();

        if (!$user) {
            return to_route('login')
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Usuário não atenticado');
        }
        
        $user->delete();

        Auth::logout();

        return to_route('login')
            ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
            ->with('flash.message', 'Usuário deletado com sucesso');;
    }
}
