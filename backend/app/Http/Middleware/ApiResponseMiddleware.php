<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ApiResponseMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);



        // Verifica se a resposta é uma instância de JsonResponse
        if ($response instanceof JsonResponse) {
            $originalData = $response->getData(true); // Obtém os dados originais da resposta

            // Extrai a mensagem da resposta original
            $message = isset($originalData['message']) ? $originalData['message'] : 'Sucesso';

            // Remove a chave 'message' dos dados originais
            unset($originalData['message']);

            $originalData  = isset($originalData['data']) ? $originalData['data'] : $originalData;
            // Monta a resposta padronizada
            $formattedResponse = [
                'statusCode' => $response->getStatusCode(),
                'message' => $message,
                'data' => ($response->getStatusCode() < 200 || $response->getStatusCode() > 300) ? null : $originalData,
            ];

            // Retorna a resposta formatada como JsonResponse
            return response()->json($formattedResponse, $response->getStatusCode());
        }

        // Retorna a resposta original se não for JsonResponse
        return $response;
    }
}
