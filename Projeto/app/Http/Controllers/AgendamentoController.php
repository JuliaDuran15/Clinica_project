<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agendamento;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ClienteController;
use App\Models\InformacaoPaciente;

class AgendamentoController extends Controller
{
    public function index()
    {
        $agendamentos = Agendamento::with(['cliente', 'psicologa'])->get();
        return Inertia::render('Agendamentos/Index', ['agendamentos' => $agendamentos]);
    }

    public function show($id)
    {
        $agendamento = Agendamento::findOrFail($id);
        return Inertia::render('Agendamentos/Show', ['agendamento' => $agendamento]);
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

        $user = Auth::user();
        
        if ($user->role === 'cliente') {
            return Redirect::route('meus-agendamentos')->with('success', 'Agendamento criado com sucesso.');
        } else {
            return Redirect::route('agendamentos.index')->with('success', 'Agendamento criado com sucesso.');
        }
    }

    public function meusAgendamentos()
    {
        // Obtém o usuário autenticado
        $user = Auth::user();

        // Acessa o cliente associado ao usuário autenticado
        $cliente = $user->cliente; // Certifique-se de que existe um relacionamento 'cliente' no modelo User

        // Verifica se o cliente existe
        if (!$cliente) {
            return Inertia::render('Agendamentos/MeusAgendamentos', [
                'agendamentos' => [],
                'message' => 'Nenhum cliente associado a este usuário.'
            ]);
        }

        // Busca os agendamentos onde o cliente_id é o ID do cliente associado
        $agendamentos = Agendamento::where('cliente_id', $cliente->id)
                                   ->with(['cliente', 'psicologa'])
                                   ->get();

        return Inertia::render('Agendamentos/MeusAgendamentos', [
            'agendamentos' => $agendamentos,
            'cliente' => $cliente]);
    }


    public function showInfo($id)
    {
        $agendamento = Agendamento::with('informacaoPaciente')->findOrFail($id);
        return Inertia::render('Agendamentos/InformacaoPaciente', [
            'agendamento' => $agendamento,
            'informacoes' => $agendamento->informacaoPaciente ? $agendamento->informacaoPaciente->informacoes : '',
        ]);
    }

    public function addInfo(Request $request, $id)
    {
        $request->validate([
            'informacoes' => 'required|string',
        ]);

        $agendamento = Agendamento::findOrFail($id);
        InformacaoPaciente::updateOrCreate(
            ['agendamento_id' => $agendamento->id],
            ['informacoes' => $request->informacoes]
        );

        return redirect()->route('meus-agendamentos-psico', $agendamento->id)->with('success', 'Informações da sessão atualizadas com sucesso.');
    }

    public function meusAgendamentosPsico()
    {
        $user = Auth::user();
        $psicologa = $user->psicologa;

        if (!$psicologa) {
            return Inertia::render('Agendamentos/MeusAgendamentosPsico', [
                'agendamentos' => [],
                'message' => 'Nenhuma psicóloga associada a este usuário.'
            ]);
        }

        $agendamentos = Agendamento::where('psicologa_id', $psicologa->id)
                                   ->with(['psicologa', 'cliente', 'informacaoPaciente'])
                                   ->get();

        return Inertia::render('Agendamentos/MeusAgendamentosPsico', ['agendamentos' => $agendamentos]);
    }


    public function createFromCliente($clienteId)
    {
        $cliente = \App\Models\Cliente::findOrFail($clienteId);
        $psicologas = \App\Models\Psicologa::all(['id', 'nome']);

        return Inertia::render('Agendamentos/CreateFromCliente', [
            'cliente' => $cliente,
            'psicologas' => $psicologas
        ]);
    }

    public function destroy($id)
    {
        $agendamento = Agendamento::findOrFail($id);
        $agendamento->delete();

        return Redirect::route('agendamentos.index')->with('success', 'Agendamento excluído com sucesso.');
    }

}
