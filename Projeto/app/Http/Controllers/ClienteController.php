<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Psicologa;
use App\Events\ClientArrived;


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
    $cliente = Cliente::find($id);
    if (!$cliente) {
        abort(404);
    }
    return Inertia::render('Clientes/Edit', ['cliente' => $cliente]);
}
public function destroy($id)
{
    $cliente = Cliente::findOrFail($id);
    $cliente->delete();
    return Redirect::route('clientes.index')->with('success', 'Cliente excluído com sucesso.');
}

public function update(Request $request, $id)
{
    $cliente = Cliente::findOrFail($id);
    $cliente->update($request->all());
    return Redirect::route('clientes.index')->with('success', 'Psicóloga atualizada com sucesso.');
}

public function showMyInfo()
{
    $cliente = Cliente::where('user_id', Auth::id())->first();
    return Inertia::render('Clientes/MyInfo', ['cliente' => $cliente]);
}


public function updateMyInfo(Request $request)
{
    $request->validate([
        'nome' => 'required|string|max:255',
        'phone_number' => 'nullable|string|max:20',
        'rua' => 'nullable|string|max:255',
        'cep' => 'nullable|string|max:10',
        'bairro' => 'nullable|string|max:255',
        'localidade' => 'nullable|string|max:255',
        'uf' => 'nullable|string|max:2',
    ]);

    $cliente = Cliente::where('user_id', Auth::id())->firstOrFail();
    $cliente->update($request->all());

        
    \Log::info('Informações atualizadas com sucesso.');

    return Redirect::route('dashboard')->with('success', 'Informações atualizadas com sucesso.');
}

public function showNotifyPage()
{
    $clientes = Cliente::all(['id', 'nome']);
    $psicologas = Psicologa::all(['id', 'nome']); // Certifique-se de que o campo correto está sendo selecionado
    
    return Inertia::render('NotifyPage', [
        'clientes' => $clientes,
        'psicologas' => $psicologas
    ]);
}

public function notifyPsychologist(Request $request)
{
    $cliente = Cliente::findOrFail($request->cliente_id);
    $psicologa = Psicologa::findOrFail($request->psicologa_id);

    // Emitir o evento
    event(new ClientArrived($cliente, $psicologa->id));

    return Redirect::route('dashboard')->with('success', 'Notificação enviada para a psicóloga.');
}

}
