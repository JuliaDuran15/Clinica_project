<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\Cliente;
use App\Models\Psicologa;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        if (Auth::check()) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

             // Redirect to the register page after logout
             return redirect()->route('register');
        }
        
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:cliente,secretaria,psicologa',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, 
        ]);

        event(new Registered($user));

         // Condicional para criar um registro de Cliente ou Psicologa
    if ($user->role == 'cliente') {
        Cliente::create([
            'user_id' => $user->id,
            'nome' => $user->name,
        ]);
    }

    if ($user->role == 'psicologa') { // Certifique-se de que a condição verifica o role correto
        Psicologa::create([
            'user_id' => $user->id,
            'nome' => $user->name,
        ]);
       
    }

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
