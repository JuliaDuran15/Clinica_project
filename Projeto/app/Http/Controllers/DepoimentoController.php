<?php

// No seu DepoimentoController

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;



class DepoimentoController extends Controller
{
    
   

public function randomDepoimentos()
{
    $depoimentos = Depoimento::inRandomOrder()->limit(3)->get();

    return response()->json($depoimentos);
}

public function indexPublic()
    {
        $depoimentos = Depoimento::all();
        return Inertia::render('Depoimentos/Public', ['depoimentos' => $depoimentos]);
    }

    /**
     * Método para exibir depoimentos na página CreateDepoimento (requer autenticação).
     */
    public function indexPrivate()
    {
        $user = Auth::user();

        // Verifica se o usuário tem um cliente associado
        $cliente = $user->cliente;
        if (!$cliente) {
            return Inertia::render('CreateDepoimento', [
                'depoimentos' => [],
                'error' => 'Nenhum cliente associado a este usuário.'
            ]);
        }

        $depoimentos = $cliente->depoimentos()->latest()->get();
        return Inertia::render('CreateDepoimento', ['depoimentos' => $depoimentos]);
    }


    public function store(Request $request)
    {
        $user = Auth::user();

        // Verifica se o usuário tem um cliente associado
        $cliente = $user->cliente;
        if (!$cliente) {
            return redirect()->back()->with('error', 'Nenhum cliente associado a este usuário.');
        }

        $request->validate([
            'mensagem' => 'required|string'
        ]);

        // Cria o depoimento usando o cliente_id do usuário autenticado
        $depoimento = new Depoimento([
            'cliente_id' => $cliente->id,
            'mensagem' => $request->input('mensagem')
        ]);
        $depoimento->save();

        return Redirect::route('depoimentos')->with('success', 'Depoimento criado com sucesso.');
    }
}

