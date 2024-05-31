<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Psicologa; // Usando o modelo Psicologa
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;


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

    public function showMyInfo()
    {
        $psicologa = Psicologa::where('user_id', Auth::id())->first();
        return Inertia::render('Psicologas/MyInfoPsico', ['psicologa' => $psicologa]);
    }
    
    
    public function updateMyInfo(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'especializacao' => 'nullable|string',
            'horario_disponivel' => 'nullable|string',
            'phone_number' => 'nullable|string|max:20',
            'rua' => 'nullable|string|max:255',
            'cep' => 'nullable|string|max:10',
            'bairro' => 'nullable|string|max:255',
            'localidade' => 'nullable|string|max:255',
            'uf' => 'nullable|string|max:2',
        ]);
    
        $psicologa = Psicologa::where('user_id', Auth::id())->firstOrFail();
        $psicologa->update($request->all());
    
            
        \Log::info('Informações atualizadas com sucesso.');
    
        return Redirect::route('dashboard')->with('success', 'Informações atualizadas com sucesso.');
    }
    
}
