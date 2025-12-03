import { generateObject, LanguageModel } from "ai";
import { ResultAsync } from "neverthrow";
import { geminiResponseSchema } from "../zod/schema.js";
import { CommonError } from "../errors.js";

interface GetTimestampError extends CommonError {
  tag: "GetTimestampError"
}

type Args = {
  model: LanguageModel,
  buffer: Buffer
}
// TODO: Tambahin message buat kirim buffer
export const getTimestamp = ({ model, buffer }: Args) =>
  ResultAsync.fromPromise(
    generateObject({
      model,
      schema: geminiResponseSchema,
      prompt: "",
    }),
    e => ({
      tag: "GetTimestampError",
      message: "Couldn't generate clip timestamps",
      cause: e
    } satisfies GetTimestampError)
  )
