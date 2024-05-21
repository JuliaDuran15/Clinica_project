import React, { useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import psicoImage from '../../../public/psico.jpg';

function ClinicWelcome(props) {
    const [activeTab, setActiveTab] = useState('services');

    return (
        <>
            <Head title="Welcome to Our Health Clinic" />
            <div className="h-screen bg-white text-gray-800 flex flex-col">
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div>
                            {props.auth.user ? (
                                <button onClick={() => setActiveTab('dashboard')} className="text-sm text-gray-800 pr-4">
                                    Dashboard
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => setActiveTab('login')} className="text-sm text-gray-800 pr-4">
                                        Log in
                                    </button>
                                    <button onClick={() => setActiveTab('register')} className="text-sm text-gray-800">
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="space-x-4">
                            <button onClick={() => setActiveTab('services')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Our Services</button>
                            <button onClick={() => setActiveTab('about')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">About Us</button>
                            <button onClick={() => setActiveTab('testimonials')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Patient Testimonials</button>
                            <button onClick={() => setActiveTab('contact')} className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contact Us</button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center">
                    {activeTab === 'services' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Our Services</h2>
                            <p className="text-gray-600 mt-4">
                            Nossa clínica de psicologia está preparada para oferecer uma ampla variedade de serviços terapêuticos, adaptados às necessidades individuais de cada paciente. Contamos com especialistas em psicoterapia cognitivo-comportamental, psicanálise, terapia sistêmica, terapia de aceitação e compromisso, e muito mais. Seja enfrentando desafios emocionais, transtornos de ansiedade, depressão ou necessidades de terapia de casal e familiar, nossa equipe está pronta para auxiliar no seu processo de cura e autoconhecimento.
                            </p>
                        </div>
                    )}
                    {activeTab === 'about' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">About Us</h2>
                            <p className="text-gray-600 mt-4">
                            Em nossa clínica, abraçamos uma abordagem holística e personalizada para o tratamento psicológico. Nosso objetivo é entender profundamente as necessidades de cada paciente e aplicar a melhor estratégia terapêutica para seu desenvolvimento e bem-estar. Combinamos métodos tradicionais e inovadores, garantindo um ambiente seguro e acolhedor, onde cada indivíduo pode explorar suas emoções e superar suas dificuldades com total suporte e discrição.
                            </p>
                        </div>
                    )}
                    {activeTab === 'testimonials' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Patient Testimonials</h2>
                            <p className="text-gray-600 mt-4">
                            "Nunca me senti tão compreendido e apoiado. A terapia transformou minha vida e recomendo esta clínica a todos que buscam paz e equilíbrio emocional." Descubra mais histórias de sucesso e transformações pessoais alcançadas através do nosso trabalho dedicado e especializado.
                            </p>
                        </div>
                    )}
                    {activeTab === 'contact' && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Contact Us</h2>
                            <p className="text-gray-600 mt-4">
                                   Se você tem qualquer dúvida ou precisa de assistência, não hesite em entrar em contato. Estamos aqui para ajudar e garantir que sua experiência conosco seja a melhor possível. Nosso time está disponível para atendê-lo tanto por telefone quanto por e-mail.
                            </p>
                            <div className="mt-6">
                                <form action="/submit-form" method="post" className="space-y-4">
                                <input type="hidden" name="_token" value={props.csrf_token} />
                                    <input type="text" name="name" placeholder="Your Name" required className="border p-2 rounded-lg w-full"/>
                                    <input type="email" name="email" placeholder="Your Email" required className="border p-2 rounded-lg w-full"/>
                                    <textarea name="message" placeholder="Your Message" className="border p-2 w-full rounded-lg"></textarea>
                                    <button type="submit" className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg  w-full">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                            
                        </div>
                    )}
                </main>

                <footer className="text-center text-sm text-gray-500 p-4">
                    Clinic v{props.clinicVersion} (PHP v{props.phpVersion})
                </footer>
            </div>
        </>
    );
}

export default ClinicWelcome;
