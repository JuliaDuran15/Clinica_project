import React, { useState } from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index(props) {
    const { clientes,auth,errors } = usePage().props;

    const { data, setData, post, processing } = useForm({ nome: "" });
    const [search, setSearch] = useState("");  // Estado para controlar o valor da busca

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja apagar este cliente?")) {
            Inertia.delete(`/clientes/${id}`);
        }
    }

    const filteredClientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Paciente</h1>
                
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nome..."
                    className="mb-6 w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Nome</th>
                                <th scope="col" className="py-3 px-6">Informações</th>
                                <th scope="col" className="py-3 px-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map(cliente => (
                                <tr key={cliente.id} className="bg-white border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{cliente.nome}</td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-gray-800">Tel: {cliente.phone_number}</p>
                                        <p className="text-sm text-gray-800">Endereço: {cliente.rua}, {cliente.bairro}, {cliente.localidade}, {cliente.uf} - {cliente.cep}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                    {auth.user && auth.user.role === 'secretaria' && (
                                        <>
                                        <InertiaLink href={`/clientes/${cliente.id}/edit`}
                                            className="font-medium text-blue-600 hover:text-blue-800 mr-3">Editar</InertiaLink>
                                        <button onClick={() => handleDelete(cliente.id)}
                                            disabled={processing}
                                            className="text-red-500 hover:text-red-700 disabled:text-gray-300 mr-3">
                                            Apagar
                                        </button>
                                        </>
                                    )}
                                        {auth.user && auth.user.role === 'psicologa' && (

                                        <InertiaLink href={`/clientes/${cliente.id}/informacoes`}
                                            className="font-medium text-green-600 hover:text-green-800">Mais Informações</InertiaLink>
                                        )}
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
