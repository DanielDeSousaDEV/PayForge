<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function profile ()
    {
        return Inertia::render('Profile');
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
}
