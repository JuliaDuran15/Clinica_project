import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import psicoImage from '../../../public/psico.jpg';


export default function ClinicWelcome(props) {
    return (
        <>
            <Head title="Welcome to Our Health Clinic" />
            <div className="min-h-screen bg-white text-gray-800">
                <nav className="fixed top-0 left-0 right-0 bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div>
                            {props.auth.user ? (
                                <Link href={route('dashboard')} className="text-sm text-gray-800 pr-4">
                                    Consultas +
                                </Link>
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
                            <a href="#services" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Our Services</a>
                            <a href="#about" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">About Us</a>
                            <a href="#testimonials" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Patient Testimonials</a>
                            <a href="#contact" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
                        </div>
                    </div>
                </nav>

                <div className="pt-24 max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-indigo-500">Welcome to Our Health Clinic</h1>
                    </div>
                    <div className='items-center mt-12 space-y-8 '>
                    <img src={psicoImage} alt="Descrição da Imagem" className="rounded-image:5%" />
                     </div>

                    <div className="mt-12 space-y-8">
                        <section id="services" className="text-center">
                            <h2 class="text-xl font-semibold text-indigo-500">Nossos Serviços</h2>
                            <p class="mt-4 text-gray-600">
                            Nossa clínica de psicologia está preparada para oferecer uma ampla variedade de serviços terapêuticos, adaptados às necessidades individuais de cada paciente. Contamos com especialistas em psicoterapia cognitivo-comportamental, psicanálise, terapia sistêmica, terapia de aceitação e compromisso, e muito mais. Seja enfrentando desafios emocionais, transtornos de ansiedade, depressão ou necessidades de terapia de casal e familiar, nossa equipe está pronta para auxiliar no seu processo de cura e autoconhecimento.
                            </p>
                        </section>

                        <section id="about" class="text-center">
                            <h2 class="text-xl font-semibold text-indigo-500">Por Que Escolher a Nossa Clínica?</h2>
                            <p class="mt-4 text-gray-600">
                            Em nossa clínica, abraçamos uma abordagem holística e personalizada para o tratamento psicológico. Nosso objetivo é entender profundamente as necessidades de cada paciente e aplicar a melhor estratégia terapêutica para seu desenvolvimento e bem-estar. Combinamos métodos tradicionais e inovadores, garantindo um ambiente seguro e acolhedor, onde cada indivíduo pode explorar suas emoções e superar suas dificuldades com total suporte e discrição.
                            </p>
                        </section>

                        <section id="testimonials" class="text-center">
                            <h2 class="text-xl font-semibold text-indigo-500">Depoimentos de Pacientes</h2>
                            <p class="mt-4 text-gray-600">
                            "Nunca me senti tão compreendido e apoiado. A terapia transformou minha vida e recomendo esta clínica a todos que buscam paz e equilíbrio emocional." Descubra mais histórias de sucesso e transformações pessoais alcançadas através do nosso trabalho dedicado e especializado.
                            </p>
                        </section>

                        <section id="contact" class="text-center">
                            <h2 class="text-xl font-semibold text-indigo-500">Contate-nos</h2>
                            <p class="mt-4 text-gray-600">
                                Se você tem qualquer dúvida ou precisa de assistência, não hesite em entrar em contato. Estamos aqui para ajudar e garantir que sua experiência conosco seja a melhor possível. Nosso time está disponível para atendê-lo tanto por telefone quanto por e-mail.
                            </p>
                            <div className="mt-6">
                                <form action="/submit-form" method="post" className="space-y-4">
                                <input type="hidden" name="_token" value={props.csrf_token} />
                                    <input type="text" name="name" placeholder="Your Name" required className="border p-2 w-full"/>
                                    <input type="email" name="email" placeholder="Your Email" required className="border p-2 w-full"/>
                                    <textarea name="message" placeholder="Your Message" className="border p-2 w-full"></textarea>
                                    <button type="submit" className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </section>


                        <div className="text-center text-gray-600 mt-6">
                            <strong>Phone:</strong> (123) 456-7890<br/>
                            <strong>Email:</strong> info@ourclinic.com<br/>
                            <strong>Address:</strong> 123 Health St, Wellness City<br/>
                            <strong>Open Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4 sm:items-center sm:justify-between">
                    <div className="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                        Clinic v{props.clinicVersion} (PHP v{props.phpVersion})
                    </div>
                </div>
            </div>
        </>
    );
}
