<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'situacao' => 'required|boolean',
        ]);

        $categoria = Categoria::create($validated);

        return response()->json($categoria, 201);
    }
}
