import { input } from "@inquirer/prompts"
import envPaths from "env-paths"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"

const paths = envPaths("perangkat_otomasi_video")
const configPath = path.join(paths.config, "config.json")

export const getApiKey = async () => {
  if (!existsSync(paths.config)) {
    mkdirSync(paths.config, { recursive: true })
  }
  if (!existsSync(configPath)) {
    const apiKey = await input({
      message: "Masukan Gemini API Key"
    })
    writeFileSync(configPath, JSON.stringify({
      apiKey
    }, null, 2))
    return apiKey
  }
  return JSON.parse(readFileSync(configPath, "utf-8")).apiKey as string
}
