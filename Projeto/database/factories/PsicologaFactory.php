<?php

namespace Database\Factories;

use App\Models\Psicologa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PsicologaFactory extends Factory
{
    protected $model = Psicologa::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Associa a um usuário gerado por fábrica
            'nome' => $this->faker->name, // Gera um nome falso
        ];
    }
}
