import { select, input } from "@inquirer/prompts";
import path from "path";
import { readFolder } from "./lib/read_folder.js";
import { ResultAsync } from "neverthrow";
import { readToBuffer } from "./lib/read_to_buffer.js";
import { getTimestamp } from "./lib/ai/get_timestamp.js";
import { createAIModel } from "./lib/ai/model.js";

const main = async () =>
  await readFolder()
    .andThen(files =>
      ResultAsync.fromSafePromise(
        select({
          message: "Pilih file video",
          choices: files
        })
      )
    )
    .map(file => path.join(process.cwd(), file as string))
    .andThen(path => readToBuffer(path))
    .andThen(buffer =>
      ResultAsync.fromSafePromise(
        input({
          message: "Masukan Gemini API Key"
        })
      )
        .map(apiKey => ({
          model: createAIModel(apiKey),
          buffer
        }))
    )
    .andThen(data => getTimestamp({
      model: data.model,
      buffer: data.buffer
    }))
    .match(
      timestamp => console.log(timestamp),
      error => {
        switch (error.tag) {
          case "ReadFolderError":
            console.log("Error folder")
            break;
          case "ReadToBufferError":
            console.log("Error buffer")
            break;
        }
      })

main()
