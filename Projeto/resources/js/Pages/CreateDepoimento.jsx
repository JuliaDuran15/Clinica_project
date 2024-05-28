import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';  // Garanta que o caminho para o componente AuthenticatedLayout está correto

function CreateDepoimento({ depoimentos, auth, errors }) {
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        Inertia.post('/depoimentos', { mensagem });
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Novo Depoimento</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Digite seu depoimento..."
                        className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
                        rows="4"
                    ></textarea>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Enviar Depoimento
                    </button>
                </form>
                <div>
                    <div>
                    <h1 className="text-2xl font-semibold text-gray-800  py-4">Seus Depoimentos</h1>

                    {depoimentos.map((depoimento, index) => (
                        <div key={index}>
                            <p> {depoimento.mensagem}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default CreateDepoimento;