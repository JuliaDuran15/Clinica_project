<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Psicologa;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Criação de um usuário com o role 'secretaria'
        User::create([
            'name' => 'Secretária',
            'email' => 'secretaria@example.com',
            'password' => Hash::make('password'),
            'role' => 'secretaria',
        ]);

        // Criação de usuários com o role 'cliente' e registros correspondentes em Cliente
        $userCliente1 = User::create([
            'name' => 'Julia Duran',
            'email' => 'juliaDuran@example.com',
            'password' => Hash::make('password'),
            'role' => 'cliente',
        ]);
        Cliente::create([
            'user_id' => $userCliente1->id,
            'nome' => $userCliente1->name,
        ]);

        $userCliente2 = User::create([
            'name' => 'Thayna Aquino',
            'email' => 'thayaquino@example.com',
            'password' => Hash::make('password'),
            'role' => 'cliente',
        ]);
        Cliente::create([
            'user_id' => $userCliente2->id,
            'nome' => $userCliente2->name,
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

        $userPsicologa2 = User::create([
            'name' => 'Luigi',
            'email' => 'Luigi@example.com',
            'password' => Hash::make('password'),
            'role' => 'psicologa',
        ]);
        Psicologa::create([
            'user_id' => $userPsicologa2->id,
            'nome' => $userPsicologa2->name,
        ]);

        // Chamar o seeder de depoimentos
        $this->call([
            DepoimentoSeeder::class,
            AgendamentoSeeder::class,
        ]);
    }
}
