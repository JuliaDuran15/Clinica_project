<?php

// No seu DepoimentoController

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;



class DepoimentoController extends Controller
{
    public function index()
    {
        $depoimentos = Depoimento::with('cliente')->get();

        // Usando Inertia para retornar a página com os dados
        return Inertia::render('Depoimentos', ['depoimentos' => $depoimentos]);
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

