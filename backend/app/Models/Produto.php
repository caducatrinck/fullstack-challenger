<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = ['categoria_id', 'nome', 'preco', 'foto', 'situacao'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
