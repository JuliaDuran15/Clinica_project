<?php

// App\Http\Controllers\DepoimentoController.php

namespace App\Http\Controllers;

use App\Models\Depoimento;
use Inertia\Inertia;

class DepoimentoController extends Controller
{
    public function index()
    {
        $depoimentos = Depoimento::all(); // Pega todos os depoimentos
        return Inertia::render('Dashboard', ['depoimentos' => $depoimentos]);
    }
}

