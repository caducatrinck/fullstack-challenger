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




        if ($response instanceof JsonResponse) {
            $originalData = $response->getData(true);


            $message = isset($originalData['message']) ? $originalData['message'] : 'Sucesso';


            unset($originalData['message']);

            $originalData  = isset($originalData['data']) ? $originalData['data'] : $originalData;

            $formattedResponse = [
                'statusCode' => $response->getStatusCode(),
                'message' => $message,
                'data' => ($response->getStatusCode() < 200 || $response->getStatusCode() > 300) ? null : $originalData,
            ];


            return response()->json($formattedResponse, $response->getStatusCode());
        }


        return $response;
    }
}
