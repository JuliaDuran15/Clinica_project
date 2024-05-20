<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DepoimentoController;

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/depoimentos', [DepoimentoController::class, 'index'])->name('depoimentos');

    // Rotas para gerenciamento de clientes
    // Especificar apenas as rotas que você está realmente usando.
    Route::resource('clientes', ClienteController::class)->except(['show', 'create', 'store']);
    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes');
});

require __DIR__.'/auth.php';
