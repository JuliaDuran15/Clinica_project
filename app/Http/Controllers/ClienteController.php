<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

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
            // Adicione regras de validação aqui
        ]);

        $cliente = Cliente::create($validated);

        return Redirect::route('clientes.index')->with('success', 'Cliente criado com sucesso.');
    }

    public function edit($id)
    {
        $cliente = Cliente::findOrFail($id);
        return Inertia::render('Clientes/Edit', ['cliente' => $cliente]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            // Adicione regras de validação aqui
        ]);

        $cliente = Cliente::findOrFail($id);
        $cliente->update($validated);

        return Redirect::route('clientes.index')->with('success', 'Cliente atualizado com sucesso.');
    }

    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return Redirect::route('clientes.index')->with('success', 'Cliente deletado com sucesso.');
    }
}
