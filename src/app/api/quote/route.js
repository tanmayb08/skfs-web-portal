import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const body = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a furniture cost estimator in India" },
      { role: "user", content: `
Furniture: ${body.furnitureType}
Room: ${body.roomType}
Size: ${body.roomSize}
Budget: ${body.budget}
Requirements: ${body.requirements}
Give estimated price in INR
` }
    ],
  });

  return Response.json({
    quote: completion.choices[0].message.content
  });
}
