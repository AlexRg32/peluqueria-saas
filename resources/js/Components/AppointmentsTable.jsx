import React from 'react'

export default function AppointmentsTable({ appointments }) {

  if (appointments.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 border-2 border-dashed rounded-lg text-gray-500">
        No hay citas programadas para este filtro.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Barbero</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Servicio</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha y Hora</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {appointments.map((cita) => (
            <tr key={cita.id} className="hover:bg-gray-50 transition-colors">
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                {cita.user?.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                {cita.employee?.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {cita.service?.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-[#b08d4b]">
                {cita.service?.price}€
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                {new Date(cita.appointment_time).toLocaleString('es-ES', {
                  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}