<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6'
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password)
    ]);

    ;$token = JWTAuth::fromUser($user);

    return response()->json([
        'success' => true,
        'message' => 'User Registered Successfully',
        'user' => $user,
        'token' => $token,
        'token_type' => 'Bearer'
    ], 201);
}

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Credentials'
            ],401);
        }

        return response()->json([
            'success' => true,
            'token' => $token
        ]);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logged Out'
        ]);
    }
}