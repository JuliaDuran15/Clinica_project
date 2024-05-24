<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DepoimentoController;
use App\Http\Controllers\PsicologaController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InformacaoPacienteController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/submit-form', [ContactController::class, 'send']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/send-email', [ContactController::class, 'sendEmail']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rotas para Depoimentos
    Route::get('/depoimentos', [DepoimentoController::class, 'index'])->name('depoimentos');
    Route::post('/depoimentos', [DepoimentoController::class, 'store']);
    // Rotas para gerenciamento de clientes
    Route::resource('clientes', ClienteController::class)->except(['show', 'create', 'store']);
    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes');
    
    Route::resource('psicologas', PsicologaController::class);
    Route::get('/psicologas', [PsicologaController::class, 'index'])->name('psicologas');

    Route::resource('agendamentos', AgendamentoController::class);
    Route::get('/meus-agendamentos', [AgendamentoController::class, 'meusAgendamentos'])
         ->name('meus-agendamentos');

         Route::get('/clientes/{clienteId}/informacoes', [InformacaoPacienteController::class, 'edit'])
         ->name('informacoes.edit');

    // Rota para atualizar as informações do paciente
    Route::post('/clientes/{clienteId}/informacoes', [InformacaoPacienteController::class, 'update'])
         ->name('informacoes.update');
    
    // routes/web.php
Route::get('/documents', function () {
    return Inertia::render('Documents');
})->name('documents');  // Adicionando nome à rota

});

require __DIR__.'/auth.php';
