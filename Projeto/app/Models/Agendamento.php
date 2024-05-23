<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    // Relação com o modelo Cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    // Relação com o modelo Psicologa
    public function psicologa()
    {
        return $this->belongsTo(Psicologa::class);
    }
}
