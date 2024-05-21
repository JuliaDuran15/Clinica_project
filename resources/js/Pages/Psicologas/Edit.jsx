import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Edit({ psicologa }) {
    const [nome, setNome] = useState(psicologa.nome);
    const [especializacao, setEspecializacao] = useState(psicologa.especializacao);
    const [horarioDisponivel, setHorarioDisponivel] = useState(psicologa.horario_disponivel);
    const [phoneNumber, setPhoneNumber] = useState(psicologa.phone_number);
    const [rua, setRua] = useState(psicologa.rua);
    const [cep, setCep] = useState(psicologa.cep);
    const [bairro, setBairro] = useState(psicologa.bairro);
    const [localidade, setLocalidade] = useState(psicologa.localidade);
    const [uf, setUf] = useState(psicologa.uf);

    function handleSubmit(event) {
        event.preventDefault();
        Inertia.put(`/psicologas/${psicologa.id}`, {
            nome,
            especializacao,
            horario_disponivel: horarioDisponivel,
            phone_number: phoneNumber,
            rua,
            cep,
            bairro,
            localidade,
            uf
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-semibold text-gray-700 mb-5">Editar Psicóloga</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {/* Nome */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Nome
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Especialização */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Especialização
                        <input
                            type="text"
                            value={especializacao}
                            onChange={(e) => setEspecializacao(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Horário Disponível */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Horário Disponível
                        <textarea
                            value={horarioDisponivel}
                            onChange={(e) => setHorarioDisponivel(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Telefone, Rua, CEP, etc. */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Telefone
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Rua, CEP, Bairro, Localidade, UF continuam com a mesma estrutura usando <input> diretamente como mostrado acima */}
                                {/* Rua */}
                                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Rua
                        <input
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* CEP */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        CEP
                        <input
                            type="text"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Bairro */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Bairro
                        <input
                            type="text"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* Localidade */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Localidade
                        <input
                            type="text"
                            value={localidade}
                            onChange={(e) => setLocalidade(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                {/* UF */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        UF
                        <input
                            type="text"
                            value={uf}
                            maxLength="2"
                            onChange={(e) => setUf(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>

                <div className="col-span-2">
                    <button type="submit"
                        className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md text-whitebg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
