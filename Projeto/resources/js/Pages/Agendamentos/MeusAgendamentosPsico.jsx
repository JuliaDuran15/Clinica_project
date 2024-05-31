import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function meusAgendamentosPsicologa({ agendamentos, auth, errors }) {
    const today = new Date();
    const agendamentosPassados = agendamentos.filter(agendamento => new Date(agendamento.data) < today).sort((a, b) => new Date(a.data) - new Date(b.data));
    const agendamentosFuturos = agendamentos.filter(agendamento => new Date(agendamento.data) >= today).sort((a, b) => new Date(a.data) - new Date(b.data));

    if (agendamentos.length === 0) {
        return (
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
                
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Agendamentos Futuros</h2>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Cliente</th>
                                <th scope="col" className="py-3 px-6">Psicóloga</th>
                                <th scope="col" className="py-3 px-6">Data</th>
                                <th scope="col" className="py-3 px-6">Hora</th>
                                <th scope="col" className="py-3 px-6">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentosFuturos.map((agendamento) => (
                                <tr key={agendamento.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-4 px-6">{agendamento.cliente.nome}</td>
                                    <td className="py-4 px-6">{agendamento.psicologa.nome}</td>
                                    <td className="py-4 px-6">{agendamento.data}</td>
                                    <td className="py-4 px-6">{agendamento.hora}</td>
                                    <td className="py-4 px-6">
                                        <InertiaLink
                                            href={route('agendamentos.show-info', agendamento.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Adicionar Informações
                                        </InertiaLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">Agendamentos Passados</h2>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Cliente</th>
                                <th scope="col" className="py-3 px-6">Psicóloga</th>
                                <th scope="col" className="py-3 px-6">Data</th>
                                <th scope="col" className="py-3 px-6">Hora</th>
                                <th scope="col" className="py-3 px-6">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentosPassados.map((agendamento) => (
                                <tr key={agendamento.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-4 px-6">{agendamento.cliente.nome}</td>
                                    <td className="py-4 px-6">{agendamento.psicologa.nome}</td>
                                    <td className="py-4 px-6">{agendamento.data}</td>
                                    <td className="py-4 px-6">{agendamento.hora}</td>
                                    <td className="py-4 px-6">
                                        <InertiaLink
                                            href={route('agendamentos.show-info', agendamento.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Adicionar Informações
                                        </InertiaLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
