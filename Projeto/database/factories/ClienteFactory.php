<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'nome' => $this->faker->name,
            'phone_number' => $this->faker->phoneNumber,
            'rua' => $this->faker->streetAddress,
            'cep' => $this->faker->postcode,
            'bairro' => $this->faker->citySuffix,
            'localidade' => $this->faker->city,
            'uf' => $this->faker->stateAbbr,
        ];
    }
}
