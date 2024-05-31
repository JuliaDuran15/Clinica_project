<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformacaoPaciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'agendamento_id',
        'informacoes',
    ];

    public function agendamento()
    {
        return $this->belongsTo(Agendamento::class);
    }
}
