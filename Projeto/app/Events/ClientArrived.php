<?php
// app/Events/ClientArrived.php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Cliente;
use App\Models\Psicologa;

class ClientArrived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $cliente;
    public $psicologaId;

    public function __construct(Cliente $cliente, Psicologa $psicologa)
    {
        $this->cliente = $cliente;
        $this->psicologaId = $psicologa->user_id;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('notifications.psicologa.' . $this->psicologaId);
    }

    public function broadcastWith()
    {
        return ['cliente' => $this->cliente];
    }

    public function broadcastAs()
    {
        return 'ClientArrived';
    }
}
