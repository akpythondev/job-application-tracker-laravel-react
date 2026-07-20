<?php

namespace App\Http\Controllers\Api;

use App\Models\JobPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JobPostController extends Controller
{
    public function index()
    {
        return response()->json(
            JobPost::latest()->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'company'=>'required',
            'location'=>'required',
            'description'=>'required'
        ]);

        $job = JobPost::create([
            'title'=>$request->title,
            'company'=>$request->company,
            'location'=>$request->location,
            'salary'=>$request->salary,
            'description'=>$request->description,
            'status'=>'active'
        ]);

        return response()->json($job,201);
    }

    public function show($id)
    {
        return JobPost::findOrFail($id);
    }

    public function update(Request $request,$id)
    {
        $job = JobPost::findOrFail($id);

        $job->update($request->all());

        return response()->json([
            'message'=>'Updated Successfully'
        ]);
    }

    public function destroy($id)
    {
        JobPost::destroy($id);

        return response()->json([
            'message'=>'Deleted Successfully'
        ]);
    }
}