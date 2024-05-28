import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, InertiaLink, usePage } from '@inertiajs/inertia-react';

export default function Dashboard() {
    const { auth, errors } = usePage().props; // Extraído diretamente do usePage para evitar passagem desnecessária de props

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clínica e Consultas</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                
                {/* Verificação de segurança para garantir que auth.user existe antes de acessar auth.user.role */}
                {auth.user && auth.user.role === 'cliente' && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <InertiaLink href={route('meus-agendamentos')} className="block p-6 bg-white border-b border-gray-200 hover:bg-gray-100">
                                Minhas Consultas
                            </InertiaLink>
                        </div>
                    </div>
                )}
                {auth.user && auth.user.role === 'psicologa' && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <InertiaLink href={route('meus-agendamentos-psicologa')} className="block p-6 bg-white border-b border-gray-200 hover:bg-gray-100">
                                Minhas Consultas
                            </InertiaLink>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
