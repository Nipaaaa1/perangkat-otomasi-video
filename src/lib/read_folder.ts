import { readdir } from "fs/promises";
import { ResultAsync } from "neverthrow";
import { CommonError } from "./errors.js";

interface ReadFolderError extends CommonError {
  tag: "ReadFolderError",
}

export const readFolder = () =>
  ResultAsync.fromPromise(
    readdir(process.cwd()),
    e => ({
      tag: "ReadFolderError",
      message: "Couldn't read from current working directory",
      cause: e
    } satisfies ReadFolderError)
  )
