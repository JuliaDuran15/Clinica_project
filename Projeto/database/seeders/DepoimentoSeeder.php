<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Depoimento;
use App\Models\Cliente;

class DepoimentoSeeder extends Seeder
{
    public function run()
    {
        // Criar depoimentos para clientes existentes
        $clientes = Cliente::all();

        foreach ($clientes as $cliente) {
            Depoimento::create([
                'cliente_id' => $cliente->id,
                'mensagem' => 'Este é um depoimento de exemplo para ' . $cliente->nome,
            ]);
        }
    }
}
