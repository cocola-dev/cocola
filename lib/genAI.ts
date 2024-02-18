import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GENERATIVE_API_KEY) {
  throw new Error(
    "You must define the GENERATIVE_API_KEY environment variable",
  );
}
export const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
