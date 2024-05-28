import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const MinhasInfos = ({auth, errors }) => {
    const { psicologa, error } = usePage().props;

    const handleEdit = () => {
        Inertia.get(route('psicologas.edit', psicologa.id));
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700 mb-5">Minhas Informações</h1>
            {psicologa ? (
                <div className="space-y-4">
                    <p className="text-lg"><strong>Nome:</strong> {psicologa.nome}</p>
                    <p className="text-lg"><strong>Especialização:</strong> {psicologa.especializacao}</p>
                    <p className="text-lg"><strong>Horário Disponível:</strong> {psicologa.horario_disponivel}</p>
                    <p className="text-lg"><strong>Número de Telefone:</strong> {psicologa.phone_number}</p>
                    <p className="text-lg"><strong>Rua:</strong> {psicologa.rua}</p>
                    <p className="text-lg"><strong>CEP:</strong> {psicologa.cep}</p>
                    <p className="text-lg"><strong>Bairro:</strong> {psicologa.bairro}</p>
                    <p className="text-lg"><strong>Localidade:</strong> {psicologa.localidade}</p>
                    <p className="text-lg"><strong>UF:</strong> {psicologa.uf}</p>
                    <button 
                        onClick={handleEdit} 
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Editar Informações
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">Nenhuma psicóloga associada a este usuário.</p>
            )}
        </div>
        </AuthenticatedLayout>
    );
};

export default MinhasInfos;
