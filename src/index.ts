import fs from "fs/promises"
import { select } from "@inquirer/prompts";
import path from "path";

const main = async () => {
  const dir = process.cwd()
  const files = await fs.readdir(dir)

  const answer = await select({
    message: "Pilih file video",
    choices: files
  })

  const joinedPath = path.join(dir, answer as string)

  const buffer = await fs.readFile(joinedPath)

  console.log(buffer)
}

main()
