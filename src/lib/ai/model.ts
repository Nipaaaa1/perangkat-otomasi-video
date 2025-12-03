import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const createAIModel = (apiKey: string) =>
  createGoogleGenerativeAI({ apiKey })
    ("gemini-2.5-flash")
