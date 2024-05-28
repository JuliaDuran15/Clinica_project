<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
    }

    public function show($id)
    {
        $cliente = Cliente::findOrFail($id);
        return Inertia::render('Clientes/Show', ['cliente' => $cliente]);
    }

    public function create()
    {
        return Inertia::render('Clientes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'rua' => 'required|string|max:255',
            'cep' => 'required|string|max:10',
            'bairro' => 'required|string|max:255',
            'localidade' => 'required|string|max:255',
            'uf' => 'required|string|max:2',
        ]);

        $cliente = Cliente::create($validated);

        return Redirect::route('clientes.index')->with('success', 'Cliente criado com sucesso.');
    }

    public function edit($id)
    {
        $cliente = Cliente::findOrFail($id);
        return Inertia::render('Clientes/Edit', ['cliente' => $cliente]);
    }

    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();
        return redirect()->route('clientes.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'rua' => 'required|string|max:255',
            'cep' => 'required|string|max:10',
            'bairro' => 'required|string|max:255',
            'localidade' => 'required|string|max:255',
            'uf' => 'required|string|max:2',
        ]);

        $cliente = Cliente::findOrFail($id);
        $cliente->update($validated);
        return Redirect::route('clientes')->with('success', 'Cliente atualizado com sucesso.');
    }

    public function minhasInfos()
    {
        $user = Auth::user();
        $cliente = $user->cliente;

        if (!$cliente) {
            return Inertia::render('Clientes/MinhasInfos', [
                'cliente' => null,
                'error' => 'Nenhum cliente associado a este usuário.'
            ]);
        }

        return Inertia::render('Clientes/MinhasInfos', [
            'clienteId' => $cliente_id
        ]);
    }

}
