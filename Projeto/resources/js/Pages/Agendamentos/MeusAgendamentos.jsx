import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MeusAgendamentos({ agendamentos, auth, errors }) {
    if (agendamentos.length === 0) {
        return (
            // O AuthenticatedLayout é o elemento pai que encapsula tudo
            <AuthenticatedLayout auth={auth} errors={errors}>
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Consultas</h1>
                    <p>Nenhum agendamento encontrado.</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Consultas</h1>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Cliente</th>
                                <th scope="col" className="py-3 px-6">Psicóloga</th>
                                <th scope="col" className="py-3 px-6">Data</th>
                                <th scope="col" className="py-3 px-6">Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map((agendamento) => (
                                <tr key={agendamento.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-4 px-6">{agendamento.cliente.nome}</td>
                                    <td className="py-4 px-6">{agendamento.psicologa.nome}</td>
                                    <td className="py-4 px-6">{agendamento.data}</td>
                                    <td className="py-4 px-6">{agendamento.hora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
