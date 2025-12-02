import { readFile } from "fs/promises";
import { ResultAsync } from "neverthrow";
import { CommonError } from "./errors.js";

interface ReadToBufferError extends CommonError {
  tag: "ReadToBufferError",
}

export const readToBuffer = (path: string) =>
  ResultAsync.fromPromise(
    readFile(path),
    e => ({
      tag: "ReadToBufferError",
      message: "Couldn't read file from path",
      cause: e
    } satisfies ReadToBufferError)
  )

