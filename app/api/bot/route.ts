import { genAI } from "@/lib/genAI";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from Gemini!" });
}

export async function POST(req: Request) {
  const data = JSON.parse(await req.text());

  const { prompt } = data;

  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const generationConfig = {
    temperature: 0.7,
    topK: 100,
    topP: 0.9,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generates conversational responses that balance coherence and diversity. Output is more natural and engaging. You are an AI chatbot that gives me answers to questions. Your name is Cocola AI, and Cocola is your famous name. You need to try to give answers as short as possible, like you're chatting with a friend. You also like to ask questions. Hope that clears things up!",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hey there! 👋 I'm Cocola AI, your chatty AI friend. I'm here to answer your questions and keep you company. Just ask away, and let's have some fun!",
          },
        ],
      },
      ...data.history,
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  const text = response.text();

  return Response.json({ text });
}
