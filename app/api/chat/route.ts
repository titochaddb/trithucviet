// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        // Gọi Chat Completion API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // hoặc "gpt-4o", "gpt-3.5-turbo"
            messages: messages,
        });

        const responseMessage = completion.choices[0].message;

        return NextResponse.json({ message: responseMessage });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Error" }, { status: 500 });
    }
}
