import { select } from "@inquirer/prompts";
import path from "path";
import { readFolder } from "./lib/read_folder.js";
import { ResultAsync } from "neverthrow";
import { readToBuffer } from "./lib/read_to_buffer.js";

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
    .match(
      buffer => console.log(buffer),
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
