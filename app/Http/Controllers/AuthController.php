<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function profile ()
    {
        return Inertia::render('Profile');
    }

    public function login ()
    {
        return;
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
