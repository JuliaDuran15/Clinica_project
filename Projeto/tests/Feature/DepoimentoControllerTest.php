<?php

namespace Tests\Feature;

use App\Models\Depoimento;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Cliente;

class DepoimentoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function it_can_list_private_depoimentos()
    {
        $user = User::factory()->create();
        $cliente = Cliente::factory()->create(['user_id' => $user->id]);
        Depoimento::factory()->count(3)->create(['cliente_id' => $cliente->id]);

        $response = $this->actingAs($user)->get(route('depoimentos'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('CreateDepoimento')
            ->has('depoimentos', 3));
    }

    /** @test */
    public function it_can_store_a_depoimento()
    {
        $user = User::factory()->create();
        $cliente = Cliente::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post(route('depoimentos.store'), [
            'mensagem' => 'Test Depoimento'
        ]);

        $response->assertRedirect(route('depoimentos'));
        $response->assertSessionHas('success', 'Depoimento criado com sucesso.');
        $this->assertDatabaseHas('depoimentos', ['mensagem' => 'Test Depoimento']);
    }

    /** @test */
    public function it_can_show_random_depoimentos()
    {
        Depoimento::factory()->count(5)->create();

        $response = $this->get(route('random-depoimentos'));

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }
}
