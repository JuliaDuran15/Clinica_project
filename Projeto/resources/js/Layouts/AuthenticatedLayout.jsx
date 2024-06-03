import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Dropdown from '@/Components/Dropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';
import logoImage from '../../../public/logo.jpg';
import NotificationListener from '@/Components/NotificationListener';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src={logoImage} alt="Logo" className="block h-8 w-auto" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                {auth.user && auth.user.role === 'secretaria' && (
                                    <NavLink href={route('agendamentos.index')} active={route().current('agendamentos.index')}>
                                        Consultas
                                    </NavLink>
                                )}
                                {auth.user && auth.user.role !== 'cliente' && (
                                    <NavLink href={route('clientes.index')} active={route().current('clientes.index')}>
                                        Pacientes
                                    </NavLink>
                                )}
                                {auth.user && auth.user.role !== 'psicologa' && (
                                    <NavLink href={route('psicologas')} active={route().current('psicologas')}>
                                        Doutores
                                    </NavLink>
                                )}
                                {auth.user && auth.user.role === 'psicologa' && (
                                    <NavLink href={route('documents')} active={route().current('documents')}>
                                        Documentos
                                    </NavLink>
                                )}
                                {auth.user && auth.user.role === 'cliente' && (
                                <NavLink href={route('depoimentos')} active={route().current('depoimentos')}>
                                    Depoimentos
                                </NavLink>
                                )}
                                {auth.user && auth.user.role === 'cliente' && (
                                        <NavLink href={route('clientes.myinfo')}>
                                            Minhas Infos
                                        </NavLink>
                                    )}

                                {auth.user && auth.user.role === 'psicologa' && (
                                     <NavLink href={route('psico.myinfo')}>
                                     Minhas Infos
                                    </NavLink>
                                    )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {auth.user.name}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {/* Replicate all navigation links as ResponsiveNavLink for mobile */}
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        {auth.user && auth.user.role === 'secretaria' && (
                        
                        <ResponsiveNavLink href={route('agendamentos.index')} active={route().current('agendamentos.index')}>
                            Consultas
                        </ResponsiveNavLink>
                        )}
                        {auth.user && auth.user.role !== 'cliente' && (
                        <ResponsiveNavLink href={route('clientes.index')} active={route().current('clientes.index')}>
                            Pacientes
                        </ResponsiveNavLink>
                        )}
                        {auth.user && auth.user.role !== 'psicologa' && (
                        <ResponsiveNavLink href={route('psicologas')} active={route().current('psicologas')}>
                            Doutores
                        </ResponsiveNavLink>
                        )}

                         {auth.user && auth.user.role === 'cliente' && (
                        <ResponsiveNavLink href={route('depoimentos')} active={route().current('depoimentos')}>
                                Depoimentos
                        </ResponsiveNavLink>
                        )}
                        {auth.user && auth.user.role === 'psicologa' && (
                        <ResponsiveNavLink href={route('documents')} active={route().current('documents')}>
                            Documentos
                        </ResponsiveNavLink>
                        )} 
                        {auth.user && auth.user.role === 'cliente' && (
                        <ResponsiveNavLink href={route('clientes.myinfo')}>
                            Minhas Infos
                        </ResponsiveNavLink>
                        )}
                        {auth.user && auth.user.role === 'psicologa' && (
                        <ResponsiveNavLink href={route('psico.myinfo')}>
                            Minhas Infos
                        </ResponsiveNavLink>
                        )}
 
                        <ResponsiveNavLink href={route('logout')} method="post" as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {auth.user && auth.user.role === 'psicologa' && (
                <NotificationListener userId={auth.user.id} />
            )}

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
