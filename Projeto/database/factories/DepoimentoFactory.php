<?php

namespace Database\Factories;

use App\Models\Depoimento;
use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepoimentoFactory extends Factory
{
    protected $model = Depoimento::class;

    public function definition()
    {
        return [
            'cliente_id' => Cliente::factory(), // Associa a um cliente gerado por fábrica
            'mensagem' => $this->faker->paragraph, // Gera um parágrafo falso para a mensagem
        ];
    }
}
