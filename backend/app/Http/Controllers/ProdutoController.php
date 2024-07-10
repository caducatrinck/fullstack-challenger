<?php

// app/Http/Controllers/ProdutoController.php
namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProdutoController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric',
            'foto' => 'nullable|string',
            'situacao' => 'required|boolean',
        ]);

        $produto = Produto::create($validated);

        // Limpar o cache quando um novo produto é criado
        Cache::forget('produtos');

        return response()->json($produto, 201);
    }

    public function index(Request $request)
    {
        $categoriaId = $request->query('categoria_id');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 10);

        $cacheKey = "produtos:categoria:$categoriaId:page:$page:per_page:$perPage";

        $produtos = Cache::remember($cacheKey, 3600, function () use ($categoriaId, $perPage) {
            $query = Produto::query();

            if ($categoriaId) {
                $query->where('categoria_id', $categoriaId);
            }

            return $query->paginate($perPage);
        });

        return response()->json($produtos);
    }
}
