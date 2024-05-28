import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const MinhasInfos = ({ cliente, error }) => {
    return (
        <div>
            <h1>Minhas Informações</h1>
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div>
                    <p><strong>ID do Cliente:</strong> {cliente.id}</p>
                    <p><strong>Nome:</strong> {cliente.nome}</p>
                    <p><strong>Telefone:</strong> {cliente.phone_number}</p>
                    <p><strong>Rua:</strong> {cliente.rua}</p>
                    <p><strong>CEP:</strong> {cliente.cep}</p>
                    <p><strong>Bairro:</strong> {cliente.bairro}</p>
                    <p><strong>Localidade:</strong> {cliente.localidade}</p>
                    <p><strong>UF:</strong> {cliente.uf}</p>
                    <InertiaLink href={`/clientes/${cliente.id}/edit`} className="btn btn-primary">Editar Informações</InertiaLink>
                </div>
            )}
        </div>
    );
};

export default MinhasInfos;
