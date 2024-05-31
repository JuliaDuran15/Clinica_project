import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import InputMask from 'react-input-mask';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const MyInfo = () => {
    const { props } = usePage();
    const { cliente, flash } = props;

    const [formData, setFormData] = useState({
        nome: cliente.nome || '',
        phone_number: cliente.phone_number || '',
        rua: cliente.rua || '',
        cep: cliente.cep || '',
        bairro: cliente.bairro || '',
        localidade: cliente.localidade || '',
        uf: cliente.uf || '',
    });

    useEffect(() => {
        if (formData.cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        console.error('CEP não encontrado');
                    } else {
                        setFormData(prevState => ({
                            ...prevState,
                            rua: data.logradouro,
                            bairro: data.bairro,
                            localidade: data.localidade,
                            uf: data.uf
                        }));
                    }
                })
                .catch(error => console.error('Erro ao buscar CEP:', error));
        }
    }, [formData.cep]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('clientes.myinfo.update'), formData);
    };

    return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Minhas Informações</h1>
            {flash && flash.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {flash.success}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Telefone
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formData.phone_number}
                            onChange={(e) => handleChange({ target: { name: 'phone_number', value: e.target.value } })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">CEP (Somente números)</label>
                    <input
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rua</label>
                    <input
                        type="text"
                        name="rua"
                        value={formData.rua}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bairro</label>
                    <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Localidade</label>
                    <input
                        type="text"
                        name="localidade"
                        value={formData.localidade}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">UF</label>
                    <input
                        type="text"
                        name="uf"
                        value={formData.uf}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Salvar</button>
            </form>
        </div>
    </AuthenticatedLayout>
    );
};

export default MyInfo;
