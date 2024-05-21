import React from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index(props) {
    const { psicologas } = usePage().props;
    const { data, setData, post, processing } = useForm({ nome: "" });

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja apagar esta psicóloga?")) {
            Inertia.delete(`/psicologas/${id}`);
        }
    }

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Psicólogas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {psicologas.map(psicologa => (
                        <div key={psicologa.id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md">
                            <h2 className="text-lg font-semibold">{psicologa.nome}</h2>
                            <p className="text-sm">{psicologa.especializacao}</p>
                            <p className="text-sm">Horário disponível: {psicologa.horario_disponivel}</p>
                            <p className="text-sm">Telefone: {psicologa.phone_number}</p>
                            <p className="text-sm">Endereço: {psicologa.rua}, {psicologa.bairro}, {psicologa.localidade}, {psicologa.uf} - {psicologa.cep}</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <InertiaLink href={`/psicologas/${psicologa.id}/edit`} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
                                    Editar
                                </InertiaLink>
                                <button onClick={() => handleDelete(psicologa.id)}
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">
                                    Apagar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
