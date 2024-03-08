import { genAI } from "@/lib/genAI";
import { NextResponse } from "next/server";
const fs = require("fs");

export async function GET() {
  return NextResponse.json({ message: "Hello from Gemini!" });
}

export async function POST(req: Request) {
  // Access your API key as an environment variable (see "Set up your API key" above)

  // Converts local file information to a GoogleGenerativeAI.Part object.
  function fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }

  async function run() {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "hello";

    const imageParts = [
      fileToGenerativePart("./assets/images/AI_chat_bot.png", "image/png"),
    ];

    console.log(imageParts);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return Response.json({ text });
  }

  run();
}
