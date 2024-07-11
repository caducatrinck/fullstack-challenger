<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function store(Request $request)
	{

		$validated = $request->validate([
			'username' => 'required|string|max:255|unique:users',
			'password' => 'required|string|min:6',
		]);

		$user = User::create([
			'username' => $validated['username'],
			'password' => $validated['password'],
		]);

		return response()->json($user, 201);
	}
}
