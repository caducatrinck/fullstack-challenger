<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class ProdutoController extends Controller
{
    public function store(Request $request)
    {
        // Adicione logs para verificar o request recebido
        error_log('Recebendo requisição: ' . json_encode($request->all()));

        try {
            // Validação dos dados recebidos
            $validated = $request->validate([
                'categoria_id' => 'required|integer|exists:categorias,id',
                'nome' => 'required|string|max:255',
                'preco' => 'required|numeric',
                'foto' => 'required|image|max:2048',
                'situacao' => 'required|boolean',
            ]);

            // Log dos dados validados
            error_log('Dados validados: ' . json_encode($validated));

            // Conversão dos dados para os tipos corretos
            $validated['categoria_id'] = (int) $validated['categoria_id'];
            $validated['preco'] = (float) $validated['preco'];
            $validated['situacao'] = filter_var($validated['situacao'], FILTER_VALIDATE_BOOLEAN);

            // Processar o upload da imagem
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $nomeFoto = time() . '_' . $foto->getClientOriginalName();
                $caminhoFoto = $foto->storeAs('public/produtos', $nomeFoto);

                // Log do caminho da foto
                error_log('Foto armazenada em: ' . $caminhoFoto);

                // Atualizar o nome da foto no array validado
                $validated['foto'] = $nomeFoto;
            } else {
                error_log('Nenhuma foto recebida.');
            }

            // Criar o produto
            $produto = Produto::create($validated);

            // Limpar o cache quando um novo produto é criado
            Cache::forget('produtos');

            return response()->json($produto, 201);
        } catch (ValidationException $e) {
            // Log dos erros de validação
            error_log('Erros de validação: ' . json_encode($e->errors()));

            // Retornar os erros de validação como resposta
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log de qualquer outra exceção
            error_log('Erro ao criar produto: ' . $e->getMessage());

            // Retornar uma resposta genérica de erro
            return response()->json(['message' => 'Erro ao criar produto'], 500);
        }
    }

    public function index(Request $request)
    {
        // Adicione logs para verificar os parâmetros da requisição
        error_log('Recebendo parâmetros: ' . json_encode($request->query()));

        $categoriaId = $request->query('categoria_id');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 10);

        error_log("Categoria ID: $categoriaId, Página: $page, Por Página: $perPage");

        $cacheKey = "produtos:categoria:$categoriaId:page:$page:per_page:$perPage";

        $produtos = Cache::remember($cacheKey, 3600, function () use ($categoriaId, $perPage) {
            $query = Produto::query();

            if ($categoriaId) {
                $query->where('categoria_id', $categoriaId);
            }

            return $query->with('categoria')->paginate($perPage); // Inclua a relação com a categoria
        });

        // Adicione logs para verificar os produtos retornados
        error_log('Produtos encontrados: ' . json_encode($produtos->items()));

        // Adicionar a URL completa da imagem
        $produtos->getCollection()->transform(function ($produto) {
            if ($produto->foto) {
                $produto->foto = url('storage/produtos/' . $produto->foto);
            }
            return $produto;
        });

        return response()->json([
            'statusCode' => 200,
            'message' => 'Sucesso',
            'data' => [
                'produtos' => $produtos->items(),
                'current_page' => $produtos->currentPage(),
                'last_page' => $produtos->lastPage(),
                'per_page' => $produtos->perPage(),
                'total' => $produtos->total(),
            ]
        ]);
    }
}
