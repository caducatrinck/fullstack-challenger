<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user instanceof User) {
                $token = $user->createToken('AuthToken')->plainTextToken;
                $expiration = config('sanctum.expiration');
                return response()->json([
                    'token' => $token,
                    'token_type' => 'Bearer',
                    'expires_in' => $expiration,
                ], 200);
            }
        }
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }
}
