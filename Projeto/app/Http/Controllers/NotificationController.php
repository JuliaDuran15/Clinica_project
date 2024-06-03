<?php
// app/Http/Controllers/NotificationController.php

namespace App\Http\Controllers;

use App\Events\ClientArrived;
use App\Models\Cliente;
use App\Models\Psicologa;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function notifyClientArrival(Request $request)
    {
        $cliente = Cliente::find($request->cliente_id);
        $psicologa = Psicologa::find($request->psicologa_id);

        if ($cliente && $psicologa) {
            event(new ClientArrived($cliente, $psicologa));
            return response()->json(['message' => 'Notificação enviada com sucesso.']);
        }

        return response()->json(['message' => 'Cliente ou Psicóloga não encontrados.'], 404);
    }
}
