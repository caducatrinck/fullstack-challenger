<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseUserController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/users', [UserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('produtos')->group(function () {
        Route::post('/', [ProdutoController::class, 'store']);
        Route::get('/', [ProdutoController::class, 'index']);
    });
    Route::prefix('categorias')->group(function () {
        Route::post('/categorias', [CategoriaController::class, 'store']);
    });
});
