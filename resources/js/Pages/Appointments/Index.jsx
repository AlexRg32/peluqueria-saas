import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppointmentsTable from '@/Components/AppointmentsTable';
import { useState } from 'react';


export default function Index({ appointments, employees }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const filteredAppointments = selectedEmployeeId === "all"
    ? appointments
    : appointments.filter((appointment) => appointment.employee_id == selectedEmployeeId);

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold text-gray-800">Gestión de Citas</h2>}
    >
      <Head title="Citas" />
      <div className="py-12 px-4">
        <div className="mx-auto max-w-7xl bg-white p-6 shadow sm:rounded-lg">
          <h3 className="mb-4 text-lg font-bold">Listado de Citas</h3>
          <div className="mb-8 max-w-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seleccionar Barbero
            </label>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#b08d4b] focus:ring-[#b08d4b] transition-all"
            >
              <option value="all">Todos los barberos</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <AppointmentsTable appointments={filteredAppointments} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}