<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Cliente;
use App\Models\User;
use Tests\TestCase;

class ClienteControllerTest extends TestCase
{
        use RefreshDatabase;
    
        /** @test */
        public function it_can_list_clients()
        {
            $user = User::factory()->create(['role' => 'secretaria']);
            Cliente::factory()->count(3)->create();
    
            $response = $this->actingAs($user)->get(route('clientes.index'));
    
            $response->assertStatus(200);
            $response->assertInertia(fn ($page) => $page
                ->component('Clientes/Index')
                ->has('clientes', 3));
        }
    
        /** @test */
        public function it_can_show_client_information()
        {
            $user = User::factory()->create(['role' => 'cliente']);
            $cliente = Cliente::factory()->create(['user_id' => $user->id]);
    
            $response = $this->actingAs($user)->get(route('clientes.myinfo'));
    
            $response->assertStatus(200);
            $response->assertInertia(fn ($page) => $page
                ->component('Clientes/MyInfo')
                ->has('cliente', fn ($page) => $page
                    ->where('id', $cliente->id)
                    ->etc()
                ));
        }
    
        /** @test */
        public function it_can_update_client_information()
    {
        $user = User::factory()->create(['role' => 'cliente']);
        $cliente = Cliente::factory()->create(['user_id' => $user->id]);

        $newData = [
            'nome' => 'Nome Atualizado',
            'phone_number' => '1234567890',
            'rua' => 'Rua Atualizada',
            'cep' => '12345-678',
            'bairro' => 'Bairro Atualizado',
            'localidade' => 'Localidade Atualizada',
            'uf' => 'UF',
        ];

        $response = $this->actingAs($user)->post(route('clientes.myinfo.update'), $newData);

        $response->assertRedirect(route('dashboard'));
        $response->assertSessionHas('success', 'Informações atualizadas com sucesso.');

        $this->assertDatabaseHas('clientes', [
            'id' => $cliente->id,
            'nome' => 'Nome Atualizado',
            'phone_number' => '1234567890',
            'rua' => 'Rua Atualizada',
            'cep' => '12345-678',
            'bairro' => 'Bairro Atualizado',
            'localidade' => 'Localidade Atualizada',
            'uf' => 'UF',
        ]);
    }

        /** @test */
        public function it_can_delete_a_client()
    {
        $user = User::factory()->create(['role' => 'cliente']);
        $cliente = Cliente::factory()->create();

        $response = $this->actingAs($user)->delete(route('clientes.destroy', $cliente->id));

        $response->assertRedirect(route('clientes.index'));
        $response->assertSessionHas('success', 'Cliente excluído com sucesso.');

        $this->assertDatabaseMissing('clientes', ['id' => $cliente->id]);
    }
    }