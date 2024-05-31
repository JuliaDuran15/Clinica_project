import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function CreateFromCliente({ cliente, psicologas }) {
    const [formData, setFormData] = useState({
        cliente_id: cliente.id,
        psicologa_id: '',
        data: '',
        hora: ''
    });

    function handleSubmit(event) {
        event.preventDefault();
        Inertia.post(route('agendamentos.store'), formData);
    }


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Novo Agendamento</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

                <div>
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">Data</label>
                    <input 
                        type="date" 
                        name="data" 
                        value={formData.data} 
                        onChange={handleChange} 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                    <input 
                        type="time" 
                        name="hora" 
                        value={formData.hora} 
                        onChange={handleChange} 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                </div>
                
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Salvar Agendamento
                </button>
            </form>
        </div>
    );
}
