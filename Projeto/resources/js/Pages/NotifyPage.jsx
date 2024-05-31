import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function NotifyPage() {
    const { auth, clientes, psicologas, errors } = usePage().props;
    const [formData, setFormData] = useState({
        cliente_id: '',
        psicologa_id: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formData.cliente_id || !formData.psicologa_id) {
            alert("Por favor, selecione um cliente e uma psicóloga.");
            return;
        }
        Inertia.post(route('notify.psychologist', formData.cliente_id), { psicologa_id: formData.psicologa_id });
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enviar Notificação</h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                                <select 
                                    name="cliente_id" 
                                    onChange={handleChange} 
                                    value={formData.cliente_id}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">Selecione um Cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Psicóloga</label>
                                <select 
                                    name="psicologa_id" 
                                    onChange={handleChange} 
                                    value={formData.psicologa_id}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">Selecione uma Psicóloga</option>
                                    {psicologas.map(psicologa => (
                                        <option key={psicologa.id} value={psicologa.id}>{psicologa.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                >
                                    Enviar Notificação
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
