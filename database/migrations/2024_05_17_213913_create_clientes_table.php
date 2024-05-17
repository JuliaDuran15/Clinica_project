<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Chave estrangeira referenciando 'users'
            $table->string('phone_number')->nullable();;
            $table->string('rua')->nullable();;
            $table->string('cep')->nullable();;
            $table->string('bairro')->nullable();;
            $table->string('localidade')->nullable();;
            $table->string('uf', 2)->nullable();; // UF geralmente tem 2 caracteres
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
    }
};
