import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('clientes.myinfo.update'), formData);
    };

    return (
        <div>
            <h1>Minhas Informações</h1>
            {flash.success && <div className="alert alert-success">{flash.success}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div>
                    <label>Telefone</label>
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </div>
                <div>
                    <label>Rua</label>
                    <input type="text" name="rua" value={formData.rua} onChange={handleChange} />
                </div>
                <div>
                    <label>CEP</label>
                    <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
                </div>
                <div>
                    <label>Bairro</label>
                    <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
                </div>
                <div>
                    <label>Localidade</label>
                    <input type="text" name="localidade" value={formData.localidade} onChange={handleChange} />
                </div>
                <div>
                    <label>UF</label>
                    <input type="text" name="uf" value={formData.uf} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
};

export default MyInfo;
