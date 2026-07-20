<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobPostController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/me',[AuthController::class,'me']);

    Route::post('/logout',[AuthController::class,'logout']);

    Route::apiResource('job-posts',JobPostController::class);

      Route::post(
        '/apply/{Id}',
        [ApplicationController::class, 'apply']
    );

    Route::get(
        '/my-applications',
        [ApplicationController::class, 'myApplications']
    );

     Route::get(
        '/dashboard',
        [DashboardController::class,'index']
    );

});
