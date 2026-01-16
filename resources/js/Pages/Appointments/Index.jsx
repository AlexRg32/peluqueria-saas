import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppointmentsTable from './Partials/AppointmentsTable';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';


export default function Index({ appointments, employees }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const filteredAppointments = selectedEmployeeId === "all"
    ? appointments
    : appointments.filter((appointment) => appointment.employee_id == selectedEmployeeId);
  const { data, setData, post, processing, reset } = useForm({
    employee_id: "",
    date: "",
    time: "",
    service_id: 1,
    user_id: 1,
  });
  const submit = (e) => {
    e.preventDefault();

    post(route('appointments.store'), {
      onSuccess: () => {
        setIsCreating(false);
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold text-gray-800">Gestión de Citas</h2>}
    >
      <Head title="Citas" />
      <div className="py-12 px-4">
        <div className="mx-auto max-w-7xl bg-white p-6 shadow sm:rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Listado de Citas</h3>
            <PrimaryButton onClick={() => setIsCreating(true)}>Crear Cita</PrimaryButton>
          </div>

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

      <Modal show={isCreating} onClose={() => setIsCreating(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">Crear Cita</h2>
          <form onSubmit={submit} >
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seleccionar Barbero
              </label>
              <select
                value={data.employee_id}
                onChange={(e) => setData('employee_id', e.target.value)}
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

            <div className="mt-4">
              <label htmlFor="">Hora</label>
              <input type="time" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#b08d4b] focus:ring-[#b08d4b] transition-all"
                onChange={(e) => setData('time', e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha
              </label>
              <input type="date"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#b08d4b] focus:ring-[#b08d4b] transition-all"
                onChange={(e) => setData('date', e.target.value)}
              />
            </div>
            <div className='mt-4'>
              <PrimaryButton disabled={processing}>
                Guardar
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>

    </AuthenticatedLayout>
  );
}