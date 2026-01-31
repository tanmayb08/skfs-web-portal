"use client";
import { saveQuote } from "@/actions/quote.actions";

export default function SubmitButton({ formData, onSuccess }) {
  return (
    <button
      type="button"
      onClick={async () => {
        // validation
        if (
          !formData.name ||
          !formData.contact ||
          !formData.furnitureType ||
          !formData.budget
        ) {
          alert("Please fill required fields (*)");
          return;
        }

        await saveQuote(
          formData.name,
          formData.contact,
          formData.furnitureType,
          formData.roomType,
          formData.roomSize,
          formData.budget,
          formData.requirements
        );

        // ✅ tell parent to reset
        onSuccess?.();
      }}
      className="w-full flex-1 bg-orange-600 text-white rounded-md py-2 text-xs font-medium hover:bg-orange-700"
    >
      Submit Quote Request
    </button>
  );
}
