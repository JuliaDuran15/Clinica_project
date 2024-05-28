<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agendamento;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class AgendamentoController extends Controller
{
    public function index()
    {
        $agendamentos = Agendamento::with(['cliente', 'psicologa'])->get();
        return Inertia::render('Agendamentos/Index', ['agendamentos' => $agendamentos]);
    }

    public function create()
    {
        $clientes = \App\Models\Cliente::all(['id', 'nome']); // Assume que tem um campo 'nome'
        $psicologas = \App\Models\Psicologa::all(['id', 'nome']);
        
        return Inertia::render('Agendamentos/Create', [
            'clientes' => $clientes,
            'psicologas' => $psicologas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'psicologa_id' => 'required|exists:psicologas,id',
            'data' => 'required|date',
            'hora' => 'required|date_format:H:i'
        ]);

        Agendamento::create($validated);
        return Redirect::route('agendamentos.index')->with('success', 'Agendamento criado com sucesso.');
    }

    public function meusAgendamentosCliente()
    {
        $user = Auth::user();
        $cliente = $user->cliente;

        if (!$cliente) {
            return Inertia::render('Agendamentos/MeusAgendamentos', [
                'agendamentos' => [],
                'message' => 'Nenhum cliente associado a este usuário.'
            ]);
        }

        $agendamentos = Agendamento::where('cliente_id', $cliente->id)
                                   ->with(['cliente', 'psicologa'])
                                   ->get();

        return Inertia::render('Agendamentos/MeusAgendamentos', ['agendamentos' => $agendamentos]);
    }

    public function meusAgendamentosPsicologa()
    {
        $user = Auth::user();
        $psicologa = $user->psicologa;

        if (!$psicologa) {
            return Inertia::render('Agendamentos/MeusAgendamentosPsico', [
                'agendamentos' => [],
                'message' => 'Nenhum psicóloga associada a este usuário.'
            ]);
        }

        $agendamentos = Agendamento::where('psicologa_id', $psicologa->id)
                                   ->with(['psicologa', 'cliente'])
                                   ->get();

        return Inertia::render('Agendamentos/MeusAgendamentosPsico', ['agendamentos' => $agendamentos]);
    }
}
