<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AgendamentoFactory extends Factory
{
    protected $model = \App\Models\Agendamento::class;

    public function definition()
    {
        return [
            'cliente_id' => \App\Models\Cliente::factory(),
            'psicologa_id' => \App\Models\Psicologa::factory(),
            'data' => $this->faker->date,
            'hora' => $this->faker->time,
        ];
    }
}

