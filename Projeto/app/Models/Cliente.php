<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $guarded = ['id'];


    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function agendamentos() {
        return $this->hasMany(Agendamento::class);
    }
    
    public function depoimentos() {
        return $this->hasMany(Depoimento::class);
    }


    protected static function booted() {
        static::deleted(function ($cliente) {
            $cliente->user->delete();
        });
    }
}
