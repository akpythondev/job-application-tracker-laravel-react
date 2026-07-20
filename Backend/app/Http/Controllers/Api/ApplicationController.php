<?php

namespace App\Http\Controllers\Api;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    public function apply($Id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $alreadyApplied = Application::where(
            'user_id',
            $user->id
        )
        ->where(
            'job_post_id',
            $Id
        )
        ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'message' => 'Already Applied'
            ], 409);
        }

        $application = Application::create([
            'user_id' => $user->id,
            'job_post_id' => $Id,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Application Submitted Successfully',
            'data' => $application
        ], 201);
    }

    public function myApplications()
    {
        $user = Auth::user();

        return Application::with('JobPost')
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }
}