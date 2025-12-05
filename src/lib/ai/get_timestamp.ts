import { generateObject, LanguageModel } from "ai";
import { ResultAsync } from "neverthrow";
import { geminiResponseSchema } from "../zod/schema.js";
import { CommonError } from "../errors.js";
import { prompts } from "./prompts.js";

interface GetTimestampError extends CommonError {
  tag: "GetTimestampError"
}

type Args = {
  model: LanguageModel,
  buffer: Buffer
}

export const getTimestamp = ({ model, buffer }: Args) =>
  ResultAsync.fromPromise(
    generateObject({
      model,
      schema: geminiResponseSchema,
      system: prompts.getTimestamp,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "file",
              data: buffer,
              mediaType: "video/mp4"
            }
          ]
        }
      ]
    }),
    e => ({
      tag: "GetTimestampError",
      message: "Couldn't generate clip timestamps",
      cause: e
    } satisfies GetTimestampError)
  )
