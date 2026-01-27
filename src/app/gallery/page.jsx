"use client";

import { useState } from "react";
import Link from "next/link";

// ----------------------------------------
// DATA
// ----------------------------------------
const galleryData = [
    {
        id: 1,
        category: "Bedroom",
        title: "Modern Bedroom Set",
        image: "/images/Gallery Images/bedroom1.jfif.jpeg",
    },
    {
        id: 2,
        category: "Wardrobe",
        title: "Luxury Wardrobe",
        image: "/images/Gallery Images/wardrobe1.jfif.jpeg",
    },
    {
        id: 3,
        category: "Living Room",
        title: "Contemporary Sofa",
        image: "/images/Gallery Images/living1.jpg.jpeg",
    },
    {
        id: 6,
        category: "Living Room",
        title: "TV Unit Wall",
        image: "/images/Gallery Images/living2.jfif.jpeg",
    },
    {
        id: 9,
        category: "Kitchen",
        title: "Modular Kitchen Design",
        image: "/images/Gallery Images/kitchen1.jfif.jpeg",
    },
    {
        id: 4,
        category: "Dining",
        title: "Dining Room Set",
        image: "/images/Gallery Images/dining1.jfif.jpeg",
    },
    {
        id: 5,
        category: "Office",
        title: "Study Table Design",
        image: "/images/Gallery Images/office1.jfif.jpeg",
    },
    {
        id: 7,
        category: "Full Home",
        title: "Complete Home Interior",
        image: "/images/Gallery Images/fullhome1.jfif.jpeg",
    },
    {
        id: 8,
        category: "Workmanship",
        title: "Craftsmanship Detail",
        image: "/images/Gallery Images/work1.jpg.jpeg",
    },
];

const filters = [
    "All",
    "Bedroom",
    "Living Room",
    "Kitchen",
    "Dining",
    "Office",
    "Wardrobe",
    "Full Home",
    "Workmanship",
];

// ----------------------------------------
// COMPONENT
// ----------------------------------------
export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredImages =
        activeFilter === "All"
            ? galleryData
            : galleryData.filter((item) => item.category === activeFilter);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">

            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Explore our collection of custom furniture projects. Each piece showcases
                    our commitment to quality craftsmanship and attention to detail.
                </p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                            ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((item) => (
                    <div
                        key={item.id}
                        className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {item.title}
                            </h3>
                            <span className="text-orange-200 text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                {item.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA SECTION */}
            <div className="mt-20 bg-orange-50 rounded-3xl p-10 md:p-16 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Inspired by Our Work?
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Let's create something beautiful for your space too! Get a personalized quote for your dream furniture.
                </p>
                <Link
                    href="/contact-us"
                    className="bg-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-700 transition-shadow shadow-lg shadow-orange-200"
                >
                    Get Your Custom Quote
                </Link>
            </div>
        </div>
    );
}