import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, InertiaLink, Link, usePage } from '@inertiajs/inertia-react';

export default function Dashboard() {
    const { auth, errors, cliente  } = usePage().props; // Extraído diretamente do usePage para evitar passagem desnecessária de props

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clínica e Consultas</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <InertiaLink href={route('meus-agendamentos-psico')} className="block p-6 bg-white border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out transform hover:scale-105">
                                    <h3 className="text-lg font-semibold text-gray-700">Minhas Consultas</h3>
                                    <p className="text-gray-500 mt-2">Gerencie suas consultas agendadas.</p>
                                </InertiaLink>
                            </div>
                        </div>
                    )} 

                {auth.user && auth.user.role === 'secretaria' && (
                    <>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="block p-6 bg-white border-b border-gray-200 hover:transition duration-200 ease-in-out transform hover:scale-105">
                            <h3 className="text-lg font-semibold text-gray-700">BOM TRABALHO!</h3>
                            </div>
                        </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <InertiaLink href={route('notify.page')} className="block p-6 bg-indigo-500 text-white border-b border-gray-200 hover:bg-indigo-600 transition duration-200 ease-in-out transform hover:scale-105">
                            Enviar Notificação de Chegada
                        </InertiaLink>
                    </div>
                </div>
                </>
                )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
