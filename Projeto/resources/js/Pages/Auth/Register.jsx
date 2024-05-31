import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputMask from 'react-input-mask';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        phone_number: '',
        rua: '',
        cep: '',
        bairro: '',
        localidade: '',
        uf: '',
        especializacao: '',
        horario_disponivel: '',
    });

    const [addressData, setAddressData] = useState({
        rua: '',
        bairro: '',
        localidade: '',
        uf: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() => {
        if (data.cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${data.cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        setAddressData({
                            rua: data.logradouro,
                            bairro: data.bairro,
                            localidade: data.localidade,
                            uf: data.uf
                        });
                    }
                })
                .catch(error => console.error('Erro ao buscar CEP:', error));
        }
    }, [data.cep]);

    useEffect(() => {
        setData({
            ...data,
            rua: addressData.rua,
            bairro: addressData.bairro,
            localidade: addressData.localidade,
            uf: addressData.uf
        });
    }, [addressData]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />
                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="Email" />
                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />
                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />
                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="role" value="Role" />
                    <select
                        name="role"
                        value={data.role}
                        onChange={onHandleChange}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="cliente">Paciente</option>
                        <option value="secretaria">Secretária</option>
                        <option value="psicologa">Psicóloga</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {data.role === 'cliente' && (
                    <>
                        <div className="mt-4">
                            <InputLabel forInput="phone_number" value="Telefone" />
                            <TextInput
                                type="text"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="cep" value="CEP" />
                            <TextInput
                                type="text"
                                name="cep"
                                value={data.cep}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.cep} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="rua" value="Rua" />
                            <TextInput
                                type="text"
                                name="rua"
                                value={data.rua}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.rua} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="bairro" value="Bairro" />
                            <TextInput
                                type="text"
                                name="bairro"
                                value={data.bairro}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.bairro} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="localidade" value="Localidade" />
                            <TextInput
                                type="text"
                                name="localidade"
                                value={data.localidade}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.localidade} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="uf" value="UF" />
                            <TextInput
                                type="text"
                                name="uf"
                                value={data.uf}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.uf} className="mt-2" />
                        </div>
                    </>
                )}

                {data.role === 'psicologa' && (
                    <>
                        <div className="mt-4">
                            <InputLabel forInput="phone_number" value="Telefone" />
                            <TextInput
                                type="text"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="especializacao" value="Especialização" />
                            <TextInput
                                type="text"
                                name="especializacao"
                                value={data.especializacao}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.especializacao} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="horario_disponivel" value="Horário Disponível" />
                            <TextInput
                                type="text"
                                name="horario_disponivel"
                                value={data.horario_disponivel}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.horario_disponivel} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="cep" value="CEP" />
                            <TextInput
                                type="text"
                                name="cep"
                                value={data.cep}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.cep} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="rua" value="Rua" />
                            <TextInput
                                type="text"
                                name="rua"
                                value={data.rua}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.rua} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="bairro" value="Bairro" />
                            <TextInput
                                type="text"
                                name="bairro"
                                value={data.bairro}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.bairro} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="localidade" value="Localidade" />
                            <TextInput
                                type="text"
                                name="localidade"
                                value={data.localidade}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.localidade} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel forInput="uf" value="UF" />
                            <TextInput
                                type="text"
                                name="uf"
                                value={data.uf}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError message={errors.uf} className="mt-2" />
                        </div>
                    </>
                )}

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
