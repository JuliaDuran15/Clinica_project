<?php

namespace Tests\Feature;

use App\Models\Agendamento;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Psicologa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AgendamentoControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_agendamentos()
    {
        $user = User::factory()->create();
        Agendamento::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('agendamentos.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Agendamentos/Index')
            ->has('agendamentos', 3));
    }

    /** @test */
    public function it_can_show_the_create_agendamento_page()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('agendamentos.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Agendamentos/Create')
            ->has('clientes')
            ->has('psicologas'));
    }

    /** @test */
    public function it_can_store_a_new_agendamento()
    {
        $user = User::factory()->create(['role' => 'cliente']);
        $cliente = \App\Models\Cliente::factory()->create(['user_id' => $user->id]);
        $psicologa = \App\Models\Psicologa::factory()->create();

        $response = $this->actingAs($user)->post(route('agendamentos.store'), [
            'cliente_id' => $cliente->id,
            'psicologa_id' => $psicologa->id,
            'data' => now()->format('Y-m-d'),
            'hora' => now()->format('H:i')
        ]);

        $response->assertRedirect(route('meus-agendamentos'));
        $response->assertSessionHas('success', 'Agendamento criado com sucesso.');
    }

    /** @test */
    public function it_can_delete_an_agendamento()
    {
        $user = User::factory()->create();
        $agendamento = Agendamento::factory()->create();

        $response = $this->actingAs($user)->delete(route('agendamentos.destroy', $agendamento->id));

        $response->assertRedirect(route('agendamentos.index'));
        $response->assertSessionHas('success', 'Agendamento excluído com sucesso.');
        $this->assertDatabaseMissing('agendamentos', ['id' => $agendamento->id]);
    }
}
