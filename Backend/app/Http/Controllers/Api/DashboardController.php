<?php

namespace App\Http\Controllers\Api;

use App\Models\JobPost;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
{
    $user = Auth::user();

    return response()->json([

        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ],

        'stats' => [

            'total_jobs' => JobPost::count(),

            'applied_jobs' => Application::where(
                'user_id',
                $user->id
            )->count(),

            'pending_jobs' => Application::where(
                'user_id',
                $user->id
            )
            ->where(
                'status',
                'pending'
            )
            ->count(),
        ],

        'recent_jobs' => JobPost::latest()
            ->take(5)
            ->get(),

        'my_applications' => Application::with('jobPost')
            ->where(
                'user_id',
                $user->id
            )
            ->latest()
            ->take(5)
            ->get()

    ]);
}
}