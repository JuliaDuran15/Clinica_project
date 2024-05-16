import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

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
                                    Dashboard
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

                    <div className="mt-12 space-y-8">
                        <section id="services" className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Our Services</h2>
                            <p className="mt-4 text-gray-600">
                                From general practice to specialized health services, our clinic is equipped to handle your health needs.
                            </p>
                        </section>

                        <section id="about" className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Why Choose Us?</h2>
                            <p className="mt-4 text-gray-600">
                                We combine cutting-edge technology with a compassionate approach to patient care that makes a difference.
                            </p>
                        </section>

                        <section id="testimonials" className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Patient Testimonials</h2>
                            <p className="mt-4 text-gray-600">
                                "I have never felt more cared for and understood by a healthcare provider. Absolutely recommend this clinic!"
                            </p>
                        </section>

                        <section id="contact" className="text-center">
                            <h2 className="text-xl font-semibold text-indigo-500">Contact Us</h2>
                            <p className="mt-4 text-gray-600">
                                If you have any questions or need assistance, please reach out. We’re here to help.
                            </p>
                            <div className="mt-6">
                                <form action="/submit-form" method="post" className="space-y-4">
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
