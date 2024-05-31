import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ agendamentos, auth, errors }) {
    const today = new Date();

    // Função auxiliar para converter data e hora em um objeto Date
    const parseDateTime = (date, time) => {
        return new Date(`${date}T${time}`);
    };

    // Separar os agendamentos passados e futuros
    const agendamentosPassados = agendamentos
        .filter(agendamento => parseDateTime(agendamento.data, agendamento.hora) < today)
        .sort((a, b) => parseDateTime(a.data, a.hora) - parseDateTime(b.data, b.hora));
    
    const agendamentosFuturos = agendamentos
        .filter(agendamento => parseDateTime(agendamento.data, agendamento.hora) >= today)
        .sort((a, b) => parseDateTime(a.data, a.hora) - parseDateTime(b.data, b.hora));

    const handleDelete = (id) => {
        if (confirm('Você tem certeza que deseja excluir este agendamento?')) {
            Inertia.delete(route('agendamentos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Consultas</h1>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">Agendamentos Futuros</h2>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Cliente</th>
                                <th scope="col" className="py-3 px-6">Psicóloga</th>
                                <th scope="col" className="py-3 px-6">Data</th>
                                <th scope="col" className="py-3 px-6">Hora</th>
                                <th scope="col" className="py-3 px-6">Ações</th>
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
                                        <button
                                            onClick={() => handleDelete(agendamento.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">Agendamentos Passados</h2>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Cliente</th>
                                <th scope="col" className="py-3 px-6">Psicóloga</th>
                                <th scope="col" className="py-3 px-6">Data</th>
                                <th scope="col" className="py-3 px-6">Hora</th>
                                <th scope="col" className="py-3 px-6">Ações</th>
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
                                        <button
                                            onClick={() => handleDelete(agendamento.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <InertiaLink href="/agendamentos/create" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">
                    Agendar Novo
                </InertiaLink>
            </div>
        </AuthenticatedLayout>
    );
}
