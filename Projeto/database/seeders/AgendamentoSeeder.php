<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Agendamento;
use App\Models\Cliente;
use App\Models\Psicologa;

class AgendamentoSeeder extends Seeder
{
    public function run()
    {
        // Obtenha todos os clientes e psicólogas existentes
        $clientes = Cliente::all();
        $psicologas = Psicologa::all();

        // Para cada cliente, crie um agendamento com uma psicóloga aleatória
        foreach ($clientes as $cliente) {
            Agendamento::create([
                'cliente_id' => $cliente->id,
                'psicologa_id' => $psicologas->random()->id,
                'data' => now()->addDays(rand(1, 30))->format('Y-m-d'),
                'hora' => now()->addHours(rand(1, 12))->format('H:i'),
            ]);
        }
    }
}
