<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depoimento extends Model
{
    use HasFactory;
     // Definindo os atributos que podem ser atribuídos em massa
     protected $guarded = ['id'];

    // Relação com o modelo Cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
