import React, { useState } from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index(props) {
    const { psicologas } = usePage().props;
    const { data, setData, post, processing } = useForm({ nome: "" });
    const [search, setSearch] = useState("");

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja apagar esta psicóloga?")) {
            Inertia.delete(`/psicologas/${id}`);
        }
    }

    const filteredPsicologas = psicologas.filter(psicologa =>
        psicologa.nome.toLowerCase().includes(search.toLowerCase()) ||
        psicologa.especializacao.toLowerCase().includes(search.toLowerCase()) ||
        psicologa.horario_disponivel.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Psicólogas</h1>
                
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nome, especialização, horário..."
                    className="mb-6 w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPsicologas.map(psicologa => (
                        <div key={psicologa.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <div className="p-5">
                                <h2 className="text-lg font-semibold text-blue-800">{psicologa.nome}</h2>
                                <p className="text-sm text-gray-600">{psicologa.especializacao}</p>
                                <p className="text-sm text-gray-600">Horário disponível: {psicologa.horario_disponivel}</p>
                                <p className="text-sm text-gray-600">Telefone: {psicologa.phone_number}</p>
                            </div>
                            <div className="px-5 py-4 bg-gray-50">
                                <div className="flex items-center justify-end space-x-2">
                                    <InertiaLink href={`/psicologas/${psicologa.id}/edit`} className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded">
                                        Editar
                                    </InertiaLink>
                                    <button onClick={() => handleDelete(psicologa.id)}
                                        disabled={processing}
                                        className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded">
                                        Apagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
