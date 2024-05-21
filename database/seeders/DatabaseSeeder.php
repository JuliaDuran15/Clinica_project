<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Psicologa;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Criação de um usuário com o role 'secretaria'
        User::create([
            'name' => 'Secretária',
            'email' => 'secretaria@example.com',
            'password' => Hash::make('password'),
            'role' => 'secretaria',
        ]);

        // Criação de um usuário com o role 'cliente' e registro correspondente em Cliente
        $userCliente = User::create([
            'name' => 'Julia Duran',
            'email' => 'juliaDuran@example.com',
            'password' => Hash::make('password'),
            'role' => 'cliente',
        ]);
        Cliente::create([
            'user_id' => $userCliente->id,
            'nome' => $userCliente->name,
        ]);

        // Criação de um usuário com o role 'psicologa' e registro correspondente em Psicologa
        $userPsicologa = User::create([
            'name' => 'Ana Lucia',
            'email' => 'AnaLucia@example.com',
            'password' => Hash::make('password'),
            'role' => 'psicologa',
        ]);
        Psicologa::create([
            'user_id' => $userPsicologa->id,
            'nome' => $userPsicologa->name,
        ]);
    }
}
