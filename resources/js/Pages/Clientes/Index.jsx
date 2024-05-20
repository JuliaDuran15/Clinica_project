import React from 'react';
import { InertiaLink, usePage, useForm} from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Index(props) {
    const { clientes } = usePage().props;
    const { data, setData, post, processing } = useForm({ nome: "" });

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja apagar este cliente?")) {
            Inertia.delete(`/clientes/${id}`);
        }
    }

    return (

        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        
    >
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Clientes</h1>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">Nome</th>
                            <th scope="col" className="py-3 px-6">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{cliente.nome}</td>
                                <td className="py-4 px-6">
                                    <InertiaLink href={`/clientes/${cliente.id}/edit`}
                                        className="font-medium text-blue-600 hover:underline">Editar</InertiaLink>
                                    <button onClick={() => handleDelete(cliente.id)}
                                        disabled={processing}
                                        className="ml-4 text-red-500 hover:text-red-700 disabled:text-gray-300">
                                        Apagar
                                    </button>
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
