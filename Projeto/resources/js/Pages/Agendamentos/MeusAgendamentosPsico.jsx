import React , { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function meusAgendamentosPsicologa({ agendamentos, auth, errors }) {
    const today = new Date();
    const [searchTerm, setSearchTerm] = useState("");

    const parseDateTime = (date, time) => {
        return new Date(`${date}T${time}`);
    };

    const filteredAgendamentos = agendamentos.filter(agendamento => {
        const fullName = `${agendamento.cliente.nome} ${agendamento.data}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const agendamentosPassados = filteredAgendamentos
        .filter(agendamento => parseDateTime(agendamento.data, agendamento.hora) < today)
        .sort((a, b) => parseDateTime(a.data, a.hora) - parseDateTime(b.data, b.hora));
    
    const agendamentosFuturos = filteredAgendamentos
        .filter(agendamento => parseDateTime(agendamento.data, agendamento.hora) >= today)
        .sort((a, b) => parseDateTime(a.data, a.hora) - parseDateTime(b.data, b.hora));
    
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
                <div className="relative mb-4">
                <input
                        type="text"
                        placeholder="Pesquisar por nome ou data"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.9 14.32a7.5 7.5 0 111.41-1.41l4.09 4.09a1 1 0 01-1.42 1.42l-4.08-4.1zm-5.4-6.74a5.5 5.5 0 1011 0 5.5 5.5 0 00-11 0z" clipRule="evenodd" />
                    </svg>
                </div>

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
