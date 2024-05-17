<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = [
        'user_id',
        'phone_number',
        'rua',
        'cep',
        'bairro',
        'localidade',
        'uf'
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function agendamentos() {
        return $this->hasMany(Agendamento::class);
    }
    
    public function depoimentos() {
        return $this->hasMany(Depoimento::class);
    }

    public function informacoesAdicionais()
    {
        return $this->hasOne(InformacaoPaciente::class);
    }

}
