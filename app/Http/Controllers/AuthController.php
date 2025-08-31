<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function profile ()
    {
        return Inertia::render('Profile');
    }

    public function login (LoginRequest $request)
    {
        return $request->validated();
    }
    
    public function showLogin ()
    {
        return Inertia::render('auth/Login');
    }

    public function register ()
    {
        return;
    }
    public function showRegister ()
    {
        return Inertia::render('auth/Register');
    }
}
