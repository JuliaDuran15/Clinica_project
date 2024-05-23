<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Depoimento;

class WelcomeController extends Controller
{
    public function show()
    {
        $depoimentos = Depoimento::with('cliente')->get();

        return Inertia::render('ClinicWelcome', [
            'depoimentos' => $depoimentos
        ]);
    }
}
