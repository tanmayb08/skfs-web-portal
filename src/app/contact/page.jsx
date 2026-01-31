"use client";

import { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Poppins } from "next/font/google";

// Load Poppins font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSubmitted(false);

        try {
            // Make sure your API file is saved at: app/api/contact/route.js
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Success state
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            
            // Hide success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);

        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className={`mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-12 bg-white ${poppins.className}`}
        >
            {/* Page Title */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900">
                    Contact Us
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    We’d love to hear from you. Get in touch with us today.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-stretch">

                {/* ================= LEFT: INFO CARD ================= */}
                <div className="border-4 border-sky-500 rounded-lg">
                    <div className="bg-[#F9FAFB] shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                                Shree Krishna Furniture
                            </h2>

                            {/* Address */}
                            <p className="text-gray-600 text-lg md:text-xl font-medium">
                                Address
                            </p>
                            <div className="flex items-start gap-3">
                                <MdLocationOn className="w-6 h-6 text-sky-500 mt-1" />
                                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                                    123 Furniture Street,<br />
                                    Interior Market,<br />
                                    Pune, Maharashtra
                                </p>
                            </div>

                            {/* Mobile */}
                            <p className="text-gray-600 text-lg md:text-xl font-medium">
                                Mobile
                            </p>
                            <div className="flex items-center gap-3">
                                <MdPhone className="w-6 h-6 text-sky-500" />
                                <p className="text-gray-700 text-lg md:text-xl">
                                    +91 98765 43210
                                </p>
                            </div>

                            {/* Email */}
                            <p className="text-gray-600 text-lg md:text-xl font-medium">
                                Email
                            </p>
                            <div className="flex items-center gap-3">
                                <MdEmail className="w-6 h-6 text-sky-500" />
                                <p className="text-gray-700 text-lg md:text-xl">
                                    info@skfurniture.com
                                </p>
                            </div>

                            {/* Footer text */}
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-2">
                                Visit our showroom or send us a message and our team
                                will get back to you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT: FORM CARD ================= */}
                <div className="border-4 border-sky-500 rounded-lg">
                    <div className="bg-[#F9FAFB] shadow-lg rounded-lg p-6 flex flex-col h-full">
                        <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4">
                            Send Us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 font-medium text-lg md:text-xl mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium text-lg md:text-xl mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium text-lg md:text-xl mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="Write your message here..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>

                            {submitted && (
                                <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}