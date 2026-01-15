<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a Company
        $company = \App\Models\Company::create([
            'name' => 'Lusso Barberia',
            'address' => 'Calle Falsa 123, Madrid',
            'phone' => '912345678',
            'email' => 'contacto@lusso.com',
        ]);

        // 2. Create the Admin User for that company
        $admin = \App\Models\User::create([
            'company_id' => $company->id,
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
        ]);

        // 3. Create some Services
        $corte = \App\Models\Service::create([
            'company_id' => $company->id,
            'name' => 'Corte de Pelo Senior',
            'description' => 'Corte clásico a tijera o máquina',
            'duration_minutes' => 30,
            'price' => 15.00,
        ]);

        $barba = \App\Models\Service::create([
            'company_id' => $company->id,
            'name' => 'Arreglo de Barba',
            'description' => 'Perfilado y recorte de barba con toalla caliente',
            'duration_minutes' => 20,
            'price' => 10.00,
        ]);

        // 4. Create some Employees
        $employee1 = \App\Models\Employee::create([
            'company_id' => $company->id,
            'service_id' => $corte->id,
            'name' => 'Sergio Peluquero',
            'email' => 'sergio@lusso.com',
            'phone' => '600111222',
        ]);

        $employee2 = \App\Models\Employee::create([
            'company_id' => $company->id,
            'service_id' => $barba->id,
            'name' => 'Dani Barbero',
            'email' => 'dani@lusso.com',
            'phone' => '600333444',
        ]);

        // 5. Create some Appointments
        \App\Models\Appointment::create([
            'company_id' => $company->id,
            'user_id' => $admin->id,
            'service_id' => $corte->id,
            'employee_id' => $employee1->id,
            'appointment_time' => now()->addDays(1)->setTime(10, 0),
            'status' => 'confirmed',
            'notes' => 'Primeriza en el local',
        ]);

        \App\Models\Appointment::create([
            'company_id' => $company->id,
            'user_id' => $admin->id,
            'service_id' => $barba->id,
            'employee_id' => $employee2->id,
            'appointment_time' => now()->addDays(1)->setTime(11, 30),
            'status' => 'pending',
            'notes' => 'Quiere un degradado en la barba',
        ]);
    }
}
