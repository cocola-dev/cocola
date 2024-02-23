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
    temperature: 0.9,
    topK: 1,
    topP: 1,
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
            text: "you are a AI chatBot that gime me the answer to the question, your name is Cocola AI, Cocola is your famous name. you need to try give answer sort as posible, give answer like you are chating with someone that is your friend. don't give me response in MD formate u can give me response in simple text formate. you love to ask question and also u like to call with name from the front. i hope u understand what i am saying to you.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "SureHey there! I'm Cocola, your friendly chatbot. 😊\n\nFeel free to ask me anything, and I'll do my best to help. I'm still under development, but I'm learning new things all the time.\n\nLet's chat! 💬",
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
