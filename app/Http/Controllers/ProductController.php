<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    function show (int $id)
    {
        return Inertia::render('BuyProduct');
    }
}
