<?php
namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Cliente;

class ClientArrived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $cliente;
    public $psicologaId;

    public function __construct(Cliente $cliente, $psicologaId)
    {
        $this->cliente = $cliente;
        $this->psicologaId = $psicologaId;
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