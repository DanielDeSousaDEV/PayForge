<?php

namespace App\Http\Controllers;

use App\FlashMessageTypeEnum;
use App\Http\Requests\User\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    function showUsersPanel ()
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

        $usersPagination = User::paginate(5);

        return Inertia::render('UsersPanel', [
            'usersPagination' => $usersPagination
        ]);
    }

    function storeUser (StoreUserRequest $request)
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

        $user = User::create($validatedData);

        // Adiciona mensagem na sessão sem redirecionar
        session()->flash('flash.type', FlashMessageTypeEnum::SUCCESS);
        session()->flash('flash.message', 'Usuário criado com sucesso!');

        return back();
    }

    function destroy ($id)
    {
        $user = User::find($id);

        if (!$user) {
            return back()
                ->with('flash.type', FlashMessageTypeEnum::ERROR)
                ->with('flash.message', 'Não foi possível achar o usuário');
        }

        $user->delete();

        return back()   
            ->with('flash.type', FlashMessageTypeEnum::SUCCESS)
            ->with('flash.message', 'Usuário excluido com sucesso!');
    }
}
