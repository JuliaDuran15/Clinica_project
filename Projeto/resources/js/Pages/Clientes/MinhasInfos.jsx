// resources/js/Pages/MinhasInfos.jsx

import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const MinhasInfos = ({auth, errors }) => {
    const { cliente, error } = usePage().props;

    const handleEdit = () => {
        Inertia.get(route('clientes.edit', cliente.id));
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700 mb-5">Minhas Informações</h1>
            {cliente ? (
                <div className="space-y-4">
                    <p className="text-lg"><strong>Nome:</strong> {cliente.nome}</p>
                    <p className="text-lg"><strong>Número de Telefone:</strong> {cliente.phone_number}</p>
                    <p className="text-lg"><strong>Rua:</strong> {cliente.rua}</p>
                    <p className="text-lg"><strong>CEP:</strong> {cliente.cep}</p>
                    <p className="text-lg"><strong>Bairro:</strong> {cliente.bairro}</p>
                    <p className="text-lg"><strong>Localidade:</strong> {cliente.localidade}</p>
                    <p className="text-lg"><strong>UF:</strong> {cliente.uf}</p>
                    <button 
                        onClick={handleEdit} 
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Editar Informações
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">Nenhum cliente associado a este usuário.</p>
            )}
        </div>
        </AuthenticatedLayout>
    );
};

export default MinhasInfos;
