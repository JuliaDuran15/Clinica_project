<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Psicologa; // Usando o modelo Psicologa
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class PsicologaController extends Controller
{
    public function index()
    {
        $psicologas = Psicologa::all();
        return Inertia::render('Psicologas/Index', ['psicologas' => $psicologas]);
    }

    public function show($id)
    {
        $psicologa = Psicologa::findOrFail($id);
        return Inertia::render('Psicologas/Show', ['psicologa' => $psicologa]);
    }

    public function create()
    {
        return Inertia::render('Psicologas/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'nullable|string',
            'especializacao' => 'nullable|string',
            'horario_disponivel' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'rua' => 'nullable|string',
            'cep' => 'nullable|string',
            'bairro' => 'nullable|string',
            'localidade' => 'nullable|string',
            'uf' => 'nullable|string|max:2',
        ]);

        $psicologa = Psicologa::create($validated);
        return Redirect::route('psicologas.index')->with('success', 'Psicóloga criada com sucesso.');
    }

    public function edit($id)
    {
        $psicologa = Psicologa::find($id);
        if (!$psicologa) {
            abort(404);
        }
        return Inertia::render('Psicologas/Edit', ['psicologa' => $psicologa]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nome' => 'nullable|string',
            'especializacao' => 'nullable|string',
            'horario_disponivel' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'rua' => 'nullable|string',
            'cep' => 'nullable|string',
            'bairro' => 'nullable|string',
            'localidade' => 'nullable|string',
            'uf' => 'nullable|string|max:2',
        ]);

        $psicologa = Psicologa::findOrFail($id);
        $psicologa->update($validated);
        return Redirect::route('psicologas')->with('success', 'Psicóloga atualizada com sucesso.');

    }

    public function destroy($id)
    {
        $psicologa = Psicologa::findOrFail($id);
        $psicologa->delete();
        return redirect()->back();
    }

    public function minhasInfos()
    {
        $user = Auth::user();
        $psicologa = $user->psicologa;

        if (!$psicologa) {
            return Inertia::render('Psicologa/MinhasInfos', [
                'psicologa' => null,
                'error' => 'Nenhum psicologa associado a este usuário.'
            ]);
        }

        return Inertia::render('Psicologa/MinhasInfos', [
            'psicologa' => $psicologa
        ]);
    }

    public function updateMinhasInfos(Request $request)
    {
        $user = Auth::user();
        $psicologa = $user->psicologa;

        if (!$psicologa) {
            return Redirect::route('minhas-infos-psico')->with('error', 'Nenhum psicologa associado a este usuário.');
        }

        $validated = $request->validate([
            // Adicione regras de validação aqui
        ]);

        $cliente->update($validated);

        return Redirect::route('minhas-infos-psico')->with('success', 'Informações atualizadas com sucesso.');
    }
}
