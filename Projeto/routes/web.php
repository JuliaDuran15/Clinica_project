<?php
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DepoimentoController;
use App\Http\Controllers\PsicologaController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\InformacaoPacienteController;
use Inertia\Inertia;

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

// Página inicial e formulário de contato
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/submit-form', [ContactController::class, 'send']);
Route::post('/send-email', [ContactController::class, 'sendEmail']);

// Rota pública para depoimentos (acessível sem autenticação)
Route::get('/random-depoimentos', [DepoimentoController::class, 'randomDepoimentos']);

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rotas autenticadas para Depoimentos
    Route::get('/depoimentos', [DepoimentoController::class, 'indexPrivate'])->name('depoimentos');
    Route::post('/depoimentos', [DepoimentoController::class, 'store'])->name('depoimentos.store');


    // Rotas para gerenciamento de clientes
    // Rotas para gerenciamento de clientes
    Route::resource('clientes', ClienteController::class)->except(['show', 'create', 'store']);
    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/minhas-infos', [ClienteController::class, 'minhasInfos'])->name('clientes.minhasInfos');


    // Rotas para gerenciamento de psicólogas
    Route::resource('psicologas', PsicologaController::class);
    Route::get('/psicologas', [PsicologaController::class, 'index'])->name('psicologas');

    // Rotas para agendamentos
    Route::resource('agendamentos', AgendamentoController::class);
    Route::get('/meus-agendamentos', [AgendamentoController::class, 'meusAgendamentos'])
         ->name('meus-agendamentos');
    // Rotas personalizadas para agendamentos
    Route::get('/meus-agendamentos-psico', [AgendamentoController::class, 'meusAgendamentosPsico'])->name('meus-agendamentos-psico');
    Route::get('/agendamentos/{clienteId}/create-from-cliente', [AgendamentoController::class, 'createFromCliente'])->name('agendamentos.create-from-cliente');


    // Rotas para informações dos pacientes
    Route::get('/clientes/{clienteId}/informacoes', [InformacaoPacienteController::class, 'edit'])->name('informacoes.edit');
    Route::post('/clientes/{clienteId}/informacoes', [InformacaoPacienteController::class, 'update'])->name('informacoes.update');

    // Rotas para "Minhas Infos"
    Route::get('/minhas-infos', [ClienteController::class, 'minhasInfos'])->name('clientes.minhasInfos');

    // Rota para documentos
    Route::get('/documents', function () {
        return Inertia::render('Documents');
    })->name('documents');
});

require __DIR__.'/auth.php';
