"use server";

import { supabase } from "@/lib/supabase/client";

export async function saveQuote(
  name,
  contact,
  furnitureType,
  roomType,
  roomSize,
  budget,
  requirements
) {

  // INSERT USER
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        name: name,
        contact: contact,
      },
    ])
    .select("user_id")
    .single();

  if (userError) {
    console.error("User insert error:", userError);
    throw new Error(userError.message);
  }
  // INSERT QUOTE
  const { error: quoteError } = await supabase
    .from("quotes")
    .insert([
      {
        user_id: userData.user_id,
        furniture_type: furnitureType,
        room_type: roomType,
        room_size: roomSize,
        budget_range: budget,
        description: requirements,
        status: "New",
      },
    ]);

  if (quoteError) {
    console.error("Quote insert error:", quoteError);
    throw new Error(quoteError.message);
  }

  return { success: true };
}
