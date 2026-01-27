"use client" ;
import React, { useState, useEffect } from "react";
import {
    Bed,
    Armchair,
    ChefHat,
    DoorOpen,
    Award,
    CheckCircle,
    Hammer,
    Clock,
    DollarSign,
    Phone,
    Star
} from "lucide-react";

/* ---------------- HERO SLIDER ---------------- */

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    const slides = [
        { image: "/images/hero1.jpeg", title: "Luxury Interior Design", subtitle: "Transform Your Space with Elegance" },
        { image: "/images/hero2.jpg", title: "Modern Modular Kitchens", subtitle: "Designed for Comfort" },
        { image: "/images/hero3.jpeg", title: "Living Room Sets", subtitle: "Premium Comfort" },
        { image: "/images/hero4.jpg", title: "Custom Wardrobes", subtitle: "Smart Storage Solutions" }
    ];

    useEffect(() => {
        const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative h-[500px] overflow-hidden">

            {slides.map((s, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img src={s.image} className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">{s.title}</h1>
                        <p className="mb-6">{s.subtitle}</p>

                        <div className="flex gap-3">
                            <button className="bg-orange-500 px-6 py-2 rounded-full">
                                Get Free Quote
                            </button>
                            <button className="border px-6 py-2 rounded-full">
                                Explore Services
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

/* ---------------- MAIN APP ---------------- */

export default function App() {
    return (
        <div className="font-sans">

            <HeroSlider />

            {/* Welcome */}
            <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-6">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Welcome to Our Studio</h2>

                    <p className="text-gray-600 mb-6">
                        With years of experience in custom furniture design and manufacturing,
                        Shree Krishna Furniture Studio has been transforming houses into homes
                        with beautiful, functional furniture.
                        <br /><br />
                        We specialize in creating personalized furniture solutions that
                        perfectly match your style, space, and budget.
                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded">
                        Contact Us
                    </button>
                </div>

                <img src="/images/welcome.jpg" className="rounded-xl shadow" />
            </section>

            {/* Stats */}
            <section className="bg-[#8B6E4E] py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white px-6">
                    <Stat num="500+" label="Projects Completed" />
                    <Stat num="250+" label="Happy Clients" />
                    <Stat num="15+" label="Years Experience" />
                    <Stat num="98%" label="Satisfaction Rate" />
                </div>
            </section>

            {/* Services */}
            <section className="bg-gray-50 py-16">
                <h2 className="text-center text-3xl font-bold mb-10">Our Services</h2>

                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-6">
                    <Service icon={Bed} title="Beds" />
                    <Service icon={DoorOpen} title="Wardrobes" />
                    <Service icon={Armchair} title="Sofas" />
                    <Service icon={ChefHat} title="Modular Kitchen" />
                </div>
            </section>

            {/* Why Choose */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                <h2 className="text-center text-3xl font-bold mb-10">Why Choose Us?</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <Feature icon={Award} title="Custom Design" />
                    <Feature icon={CheckCircle} title="Premium Quality" />
                    <Feature icon={Hammer} title="Expert Craft" />
                    <Feature icon={Clock} title="On Time" />
                    <Feature icon={DollarSign} title="Affordable" />
                    <Feature icon={Phone} title="Support" />
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-50 py-16">
                <h2 className="text-center text-3xl font-bold mb-10">
                    What Our Customers Say
                </h2>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-6">
                    <Review
                        name="Rajesh Sharma"
                        rating={5}
                        text="Excellent craftsmanship! Our modular kitchen looks amazing and was delivered on time."
                    />

                    <Review
                        name="Pooja Patil"
                        rating={4}
                        text="Beautiful wardrobes and very professional team. Highly recommended."
                    />

                    <Review
                        name="Amit Pawar"
                        rating={5}
                        text="Great quality sofas and finishing. Totally satisfied with their service."
                    />
                </div>
            </section>

        </div>
    );
}

/* ---------------- HELPERS ---------------- */

const Stat = ({ num, label }) => (
    <div>
        <h2 className="text-4xl font-bold mb-2">{num}</h2>
        <p className="text-orange-100">{label}</p>
    </div>
);

const Service = ({ icon: Icon, title }) => (
    <div className="bg-white p-6 rounded shadow text-center">
        <Icon className="mx-auto mb-3 text-orange-500" />
        <h4 className="font-semibold">{title}</h4>
    </div>
);

const Feature = ({ icon: Icon, title }) => (
    <div className="bg-white p-4 rounded shadow flex gap-3">
        <Icon className="text-orange-500" />
        <p>{title}</p>
    </div>
);

const Review = ({ name, text, rating }) => (
    <div className="bg-white p-6 rounded shadow">
        <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-orange-500" : "text-gray-300"}
                />
            ))}
        </div>

        <p className="text-sm mb-3 text-gray-600">{text}</p>

        <strong>{name}</strong>
    </div>
);
