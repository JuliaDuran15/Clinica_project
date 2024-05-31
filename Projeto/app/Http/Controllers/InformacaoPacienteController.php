<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\InformacaoPaciente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformacaoPacienteController extends Controller
{
    /**
     * Mostra o formulário para editar as informações do paciente.
     *
     * @param  int  $clienteId
     * @return \Inertia\Response
     */
    public function edit($clienteId)
{
    // Carregar cliente e suas informações de paciente (assumindo que 'informacoesAdicionais' é o nome do relacionamento)
    $cliente = Cliente::with('informacoesAdicionais')->findOrFail($clienteId);

    return Inertia::render('InformacaoPaciente', [
        'cliente' => $cliente,
        'informacoes' => $cliente->informacoesAdicionais ? $cliente->informacoesAdicionais->informacoes : ''
    ]);
}


    /**
     * Atualiza as informações do paciente.
     *
     * @param  Request  $request
     * @param  int  $clienteId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $clienteId)
    {
        $request->validate([
            'informacoes' => 'required|string',
        ]);

        $cliente = Cliente::findOrFail($clienteId);
        $informacoes = $cliente->informacoesAdicionais;

        if (!$informacoes) {
            $informacoes = new InformacaoPaciente(['cliente_id' => $clienteId]);
        }

        $informacoes->informacoes = $request->informacoes;
        $informacoes->save();

        return redirect()->back()->with('success', 'Informações atualizadas com sucesso!');
    }
}
