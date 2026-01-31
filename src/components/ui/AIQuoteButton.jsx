"use client";
import { useState } from "react";

export default function AIQuoteButton({ formData, onQuote }) {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [open, setOpen] = useState(false);

  const sendToAI = async () => {
    setLoading(true);
    setQuote("");

    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setQuote(data.quote || "No quote generated");
    onQuote?.(data.quote);

    setOpen(true);
    setLoading(false);
  };

  const downloadQuote = () => {
    const printContents = document.getElementById("ai-quote-popup").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      {/* BUTTON */}
      <div className="flex-1">
        <button
          onClick={sendToAI}
          className="w-full bg-orange-600 text-white py-2 rounded-md text-xs"
        >
          {loading ? "Generating..." : "Get AI Quote"}
        </button>
      </div>

      {/* POPUP */}
      {open && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      id="ai-quote-popup"
      className="bg-white w-[95%] max-w-xl rounded-xl p-5 relative animate-scaleIn"
    >
      {/* CLOSE */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      {/* HEADER */}
      <h3 className="font-semibold text-sm mb-3 text-center">
        AI Generated Quotation
      </h3>

      {/* QUOTE BODY */}
      <div className="text-xs whitespace-pre-wrap border rounded-md p-3 bg-gray-50 max-h-[60vh] overflow-y-auto">
        {quote}
      </div>

      {/* FOOTER */}
      <div className="mt-4 flex justify-between items-center border-t pt-3">
        <p className="text-[11px] text-gray-500">
          * This is an AI-generated quotation. Final price may vary.
        </p>

        <button
          onClick={downloadQuote}
          className="bg-orange-600 text-white px-4 py-1.5 rounded text-xs hover:bg-orange-700"
        >
          Download
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
