<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $appointments = Appointment::with(['service', 'user', 'employee'])->get();
       $employees = Employee::all();
       return Inertia::render('Appointments/Index', [
           'appointments' => $appointments,
           'employees' => $employees,
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required',
            'date' => 'required',
            'time' => 'required',
            'service_id' => 'required',
            'user_id' => 'required',
        ]);

        $appointmentTime = $request->date . ' ' . $request->time . ':00';

         Appointment::create([
        'company_id'       => auth()->user()->company_id, 
        'employee_id'      => $request->employee_id,
        'user_id'          => $request->user_id,
        'service_id'       => $request->service_id,
        'appointment_time' => $appointmentTime,
        'status'           => 'pending',
    ]);

        return redirect()->route('appointments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
