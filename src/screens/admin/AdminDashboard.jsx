"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    LogOut,
    Package,
    Search,
    Filter,
    ChevronDown
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [quotes, setQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const router = useRouter();

    // Load quotes from localStorage
    React.useEffect(() => {
        const storedQuotes = JSON.parse(localStorage.getItem("skfs_quotes") || "[]");
        setQuotes(storedQuotes);
    }, []);

    // Update quote status
    const updateStatus = (id, newStatus) => {
        const updatedQuotes = quotes.map(q =>
            q.id === id ? { ...q, status: newStatus } : q
        );
        setQuotes(updatedQuotes);
        localStorage.setItem("skfs_quotes", JSON.stringify(updatedQuotes));
    };

    // Delete quote
    const deleteQuote = (id) => {
        if (confirm("Are you sure you want to delete this quote?")) {
            const updatedQuotes = quotes.filter(q => q.id !== id);
            setQuotes(updatedQuotes);
            localStorage.setItem("skfs_quotes", JSON.stringify(updatedQuotes));
        }
    };

    const handleLogout = () => {
        router.push("/");
    };

    const statuses = ["All Status", "New", "Contacted", "Finalized"];

    // Calculate real-time stats
    const stats = [
        { label: "Total Quotes", value: quotes.length, icon: <Package className="w-10 h-10 text-gray-400" /> },
        {
            label: "New Requests",
            value: quotes.filter(q => q.status === "New").length,
            color: "text-blue-600",
            badge: (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg font-bold">
                        {quotes.filter(q => q.status === "New").length}
                    </span>
                </div>
            )
        },
        {
            label: "Contacted",
            value: quotes.filter(q => q.status === "Contacted").length,
            color: "text-yellow-600",
            badge: (
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-600 text-lg font-bold">
                        {quotes.filter(q => q.status === "Contacted").length}
                    </span>
                </div>
            )
        },
        {
            label: "Finalized",
            value: quotes.filter(q => q.status === "Finalized").length,
            color: "text-green-600",
            badge: (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-lg font-bold">
                        {quotes.filter(q => q.status === "Finalized").length}
                    </span>
                </div>
            )
        },
    ];

    // Filter quotes based on search and status
    // Filter quotes based on search and status
    const filteredQuotes = (quotes || []).filter(quote => {
        const searchLower = searchTerm.toLowerCase().trim();

        if (!searchLower) return statusFilter === "All Status" || quote.status === statusFilter;

        const matchesSearch = (
            (quote.name?.toLowerCase() || "").includes(searchLower) ||
            (quote.contact?.toLowerCase() || "").includes(searchLower) ||
            (quote.furnitureType?.toLowerCase() || "").includes(searchLower) ||
            (quote.roomType?.toLowerCase() || "").includes(searchLower) ||
            (quote.roomSize?.toLowerCase() || "").includes(searchLower) ||
            (quote.requirements?.toLowerCase() || "").includes(searchLower)
        );

        const matchesStatus = statusFilter === "All Status" || quote.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6">
                    <div className="flex flex-col items-start gap-4">
                        <Link
                            href="/"
                            className="h-8 px-3 rounded-md border border-gray-200 bg-white inline-flex items-center text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
                            <p className="text-base text-gray-600">Manage your furniture quote requests</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="h-9 px-4 py-2 rounded-md border border-gray-200 bg-white inline-flex items-center text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl border border-black/10 p-6 shadow-sm flex flex-col">
                            <span className="text-sm text-gray-600 mb-1">{stat.label}</span>
                            <div className="flex items-center justify-between mt-auto">
                                <span className={`text-3xl font-bold ${stat.color || "text-black"}`}>
                                    {stat.value}
                                </span>
                                {stat.badge || stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter Section */}
                <div className="bg-white rounded-xl border border-black/10 p-6 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium text-black">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, contact, or furniture type..."
                                    className="w-full h-9 pl-10 pr-3 py-1 bg-[#f3f3f5] border border-transparent rounded-md text-sm md:text-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-normal placeholder:text-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black">Filter by Status</label>
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="h-9 w-full md:w-48 px-3 py-2 bg-[#f3f3f5] border border-gray-200 rounded-md flex items-center justify-between text-sm transition-all text-gray-700"
                                >
                                    <div className="flex items-center">
                                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>{statusFilter}</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full right-0 mt-1 w-full md:w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                                        {statuses.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === status ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quotes List or Empty State */}
                {filteredQuotes.length > 0 ? (
                    <div className="bg-white rounded-xl border border-black/10 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Furniture & Room</th>
                                        <th className="px-6 py-4">Requirements</th>
                                        <th className="px-6 py-4">Budget</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredQuotes.map((quote) => (
                                        <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{quote.date}</td>
                                            <td className="px-6 py-4 font-medium text-black">
                                                {quote.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {quote.contact}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900 font-medium">{quote.furnitureType}</div>
                                                <div className="text-xs text-gray-500 flex flex-col gap-0.5">
                                                    {quote.roomType && <span>Type: {quote.roomType}</span>}
                                                    {quote.roomSize && <span>Size: {quote.roomSize}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs">
                                                <div className="text-gray-600 text-sm truncate" title={quote.requirements}>
                                                    {quote.requirements || <span className="text-gray-400 italic">None</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{quote.budget}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${quote.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                        quote.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                                                            quote.status === 'Finalized' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {quote.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {quote.status === "New" && (
                                                        <button
                                                            onClick={() => updateStatus(quote.id, "Contacted")}
                                                            className="text-xs text-blue-600 hover:underline"
                                                        >
                                                            Mark Contacted
                                                        </button>
                                                    )}
                                                    {quote.status === "Contacted" && (
                                                        <button
                                                            onClick={() => updateStatus(quote.id, "Finalized")}
                                                            className="text-xs text-green-600 hover:underline"
                                                        >
                                                            Mark Finalized
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteQuote(quote.id)}
                                                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                                                    >
                                                        <LogOut className="w-4 h-4 rotate-180" /> {/* Using LogOut icon rotated as delete placeholder if needed, or better import Trash */}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-black/10 py-24 shadow-sm text-center">
                        <div className="flex flex-col items-center">
                            <Package className="w-16 h-16 text-gray-300 mb-4" />
                            <h2 className="text-xl font-semibold text-black mb-2">No quote requests found</h2>
                            <p className="text-base text-gray-600">Quote requests will appear here once customers submit them</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
