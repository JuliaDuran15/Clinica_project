import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/inertia-react';

export default function InformacaoPaciente(props) {
    const { auth, errors, cliente, informacoes: informacoesIniciais } = usePage().props;
    const [informacoes, setInformacoes] = useState(informacoesIniciais || "");

    function handleSubmit(event) {
        event.preventDefault();
        Inertia.post(`/clientes/${cliente.id}/informacoes`, { informacoes });
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Informações do Paciente</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none"
                        rows="6"
                        value={informacoes}
                        onChange={(e) => setInformacoes(e.target.value)}
                        placeholder="Digite as informações adicionais aqui..."
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={!informacoes.trim()}
                    >
                        Salvar Informações
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
