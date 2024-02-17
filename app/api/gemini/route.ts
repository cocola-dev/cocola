import { genAI } from "@/lib/genAI";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from Gemini!" });
}

export async function POST(req: Request) {
  const data = await req.text();
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Greetings! How may I assist you today?" }],
      },
      {
        role: "user",
        parts: [{ text: "hi how r u? write some code in TS" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'I am well, thank you. Here is some TypeScript code:\n\n```typescript\n// Define a function that returns a string\nconst greet = (name: string): string => {\n  return `Hello, ${name}!`;\n};\n\n// Call the function and store the result in a variable\nconst greeting = greet("John");\n\n// Print the greeting to the console\nconsole.log(greeting);\n```\n\nThis code defines a function called `greet` that takes a string as an argument and returns a string. The function is called with the argument `"John"` and the result is stored in the variable `greeting`. The greeting is then printed to the console.\n\nWhen you run this code, it will output the following to the console:\n\n```\nHello, John!\n```',
          },
        ],
      },
    ],
  });

  // const result = await model.generateContent(prompt);
  const result = await chat.sendMessage(data);
  const response = result.response;

  console.log("response", response);
  const text = response.text();

  return Response.json({ response, text });
}
