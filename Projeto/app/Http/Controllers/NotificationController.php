<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ClientArrived;
use App\Models\Cliente;
use App\Models\Psicologa;


class NotificationController extends Controller
{
    public function notifyPsychologist(Request $request, $cliente_id)
    {
        $cliente = Cliente::findOrFail($cliente_id);
        $psicologaId = $request->input('psicologa_id');
        $psicologa = Psicologa::findOrFail($psicologaId);

        // Emitir o evento
        event(new ClientArrived($cliente, $psicologa->id));

        return response()->json(['status' => 'Notification sent to psychologist!']);
    }
}
