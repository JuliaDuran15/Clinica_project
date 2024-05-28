import React, { useRef, useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

function ClinicWelcome(props) {
    const [activeTab, setActiveTab] = useState('services');
    const [depoimentos, setDepoimentos] = useState([]);

    // Referências para os campos do formulário
    const emailRef = useRef('');
    const subjectRef = useRef('');
    const messageRef = useRef('');

    // Função para enviar o formulário usando Inertia
    const sendEmail = (e) => {
        e.preventDefault();
        Inertia.post('/send-email', {
            email: emailRef.current.value,
            subject: subjectRef.current.value,
            message: messageRef.current.value,
        }, {
            onSuccess: () => alert('Email enviado com sucesso!'),
            onError: () => alert('Erro ao enviar email.')
        });
    };

    useEffect(() => {
        if (activeTab === 'testimonials') {
            Inertia.get('/random-depoimentos', {}, {
                only: ['depoimentos'],
                onError: (errors) => {
                    console.error('Erro ao carregar depoimentos', errors);
                    alert('Erro ao carregar depoimentos.');
                },
                onSuccess: ({ data }) => {
                    if (data) {
                        setDepoimentos(data);
                    } else {
                        alert('Nenhum depoimento disponível.');
                    }
                }
            });
        }
    }, [activeTab]);

    return (
        <>
            <Head title="Welcome to Our Health Clinic" />
            <div className="h-screen bg-white text-gray-800 flex flex-col">
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div>
                            {props.auth.user ? (
                                <>
                                    <Link href={route('dashboard')} className="text-sm text-gray-800 pr-4">
                                        Consultas +
                                    </Link>
                                    <Link href={route('register')} className="text-sm text-gray-800">
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm text-gray-800 pr-4">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="text-sm text-gray-800">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="space-x-4">
                            <button onClick={() => setActiveTab('services')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Nossos Serviços</button>
                            <button onClick={() => setActiveTab('about')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Sobre Nós</button>
                            <button onClick={() => setActiveTab('testimonials')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Depoimentos</button>
                            <button onClick={() => setActiveTab('contact')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contate-nos</button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center">
                    {activeTab === 'services' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Nossos Serviços</h2>
                            <p className="text-gray-600 mt-4">
                                Nossa clínica de psicologia está preparada para oferecer uma ampla variedade de serviços terapêuticos, adaptados às necessidades individuais de cada paciente. Contamos com especialistas em psicoterapia cognitivo-comportamental, psicanálise, terapia sistêmica, terapia de aceitação e compromisso, e muito mais. Seja enfrentando desafios emocionais, transtornos de ansiedade, depressão ou necessidades de terapia de casal e familiar, nossa equipe está pronta para auxiliar no seu processo de cura e autoconhecimento.
                            </p>
                        </div>
                    )}
                    {activeTab === 'about' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Sobre Nós</h2>
                            <p className="text-gray-600 mt-4">
                                Em nossa clínica, abraçamos uma abordagem holística e personalizada para o tratamento psicológico. Nosso objetivo é entender profundamente as necessidades de cada paciente e aplicar a melhor estratégia terapêutica para seu desenvolvimento e bem-estar. Combinamos métodos tradicionais e inovadores, garantindo um ambiente seguro e acolhedor, onde cada indivíduo pode explorar suas emoções e superar suas dificuldades com total suporte e discrição.
                            </p>
                        </div>
                    )}
                    {activeTab === 'testimonials' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Depoimentos</h2>
                            {depoimentos.length > 0 ? (
                                depoimentos.map(depoimento => (
                                    <p key={depoimento.id} className="text-gray-600 mt-4">
                                        "{depoimento.mensagem}" - Cliente: {depoimento.cliente.nome}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-600 mt-4">Ainda não temos depoimentos para mostrar.</p>
                            )}
                        </div>
                    )}
                    {activeTab === 'contact' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Contate-nos</h2>
                            <p className="text-gray-600 mt-4">
                                Se você tem qualquer dúvida ou precisa de assistência, não hesite em entrar em contato. Estamos aqui para ajudar e garantir que sua experiência conosco seja a melhor possível. Nosso time está disponível para atendê-lo tanto por telefone quanto por e-mail.
                            </p>
                            <div className="mt-6">
                                <form onSubmit={sendEmail} className="space-y-4">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Your Email" 
                                        required 
                                        className="border p-2 rounded-lg w-full" 
                                        ref={emailRef} 
                                    />
                                    <input 
                                        type="text" 
                                        name="subject" 
                                        placeholder="Subject" 
                                        required 
                                        className="border p-2 rounded-lg w-full" 
                                        ref={subjectRef} 
                                    />
                                    <textarea 
                                        name="message" 
                                        placeholder="Your Message" 
                                        className="border p-2 w-full rounded-lg" 
                                        ref={messageRef} 
                                    ></textarea>
                                    <button 
                                        type="submit" 
                                        className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="text-center text-sm text-gray-500 p-3 indigo-500">
                    <div className="text-center mt-4">
                        <strong className='text-indigo-500'>Phone:</strong> (123) 456-7890
                        <strong className='text-indigo-500'>  Email:</strong> info@ourclinic.com<br/>
                        <strong className='text-indigo-500'>Address:</strong> 123 Health St, Wellness City<br/>
                        <strong className='text-indigo-500'>Open Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ClinicWelcome;
