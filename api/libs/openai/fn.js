import express from "express"
import { spawn } from "child_process"
import fs from "fs"
import path from "path"
import bodyParser from "body-parser"
import axios from "axios"
import https from "https"
import os from "os"
import { randomUUID } from "crypto"
import { config } from "dotenv"
config()
const port = process.env.SERVER_PORT || 3040
const baseUrl = "https://chat.openai.com"
const apiUrl = `${baseUrl}/backend-anon/conversation`
const refreshInterval = 60000
const errorWait = 120000
let cloudflared
let token
let oaiDeviceId
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function GenerateCompletionId(prefix = "cmpl-") {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const length = 28
  for (let i = 0; i < length; i++) {
    prefix += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return prefix
}
async function* chunksToLines(chunksAsync) {
  let previous = ""
  for await (const chunk of chunksAsync) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    previous += bufferChunk
    let eolIndex
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      const line = previous.slice(0, eolIndex + 1).trimEnd()
      if (line === "data: [DONE]") break
      if (line.startsWith("data: ")) yield line
      previous = previous.slice(eolIndex + 1)
    }
  }
}
async function* linesToMessages(linesAsync) {
  for await (const line of linesAsync) {
    const message = line.substring("data :".length)
    yield message
  }
}
async function* StreamCompletion(data) {
  yield* linesToMessages(chunksToLines(data))
}
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  proxy:
    process.env.PROXY === "true"
      ? {
          host: process.env.PROXY_HOST,
          port: Number(process.env.PROXY_PORT),
          auth:
            process.env.PROXY_AUTH === "true"
              ? {
                  username: process.env.PROXY_USERNAME,
                  password: process.env.PROXY_PASSWORD,
                }
              : undefined,
          protocol: process.env.PROXY_PROTOCOL,
        }
      : false,
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "oai-language": "en-US",
    origin: baseUrl,
    pragma: "no-cache",
    referer: baseUrl,
    "sec-ch-ua": '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  },
})
async function getNewSessionId() {
  let newDeviceId = randomUUID()
  const response = await axiosInstance.post(
    `${baseUrl}/backend-anon/sentinel/chat-requirements`,
    {},
    {
      headers: { "oai-device-id": newDeviceId },
    },
  )
  console.log(
    `System: Successfully refreshed session ID and token. ${!token ? "(Now it's ready to process requests)" : ""}`,
  )
  oaiDeviceId = newDeviceId
  token = response.data.token
}
function enableCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  next()
}

async function DownloadCloudflared() {
  const platform = os.platform()
  let url
  if (platform === "win32") {
    const arch = os.arch() === "x64" ? "amd64" : "386"
    url = `https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-${arch}.exe`
  } else {
    let arch = os.arch()
    switch (arch) {
      case "x64":
        arch = "amd64"
        break
      case "arm":
      case "arm64":
        break
      default:
        arch = "amd64"
    }
    const platformLower = platform.toLowerCase()
    url = `https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-${platformLower}-${arch}`
  }
  const fileName = platform === "win32" ? "cloudflared.exe" : "cloudflared"
  const filePath = path.resolve(fileName)
  if (fs.existsSync(filePath)) {
    return filePath
  }
  try {
    const response = await axiosInstance({
      method: "get",
      url: url,
      responseType: "stream",
    })
    const writer = fs.createWriteStream(filePath)
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        if (platform !== "win32") {
          fs.chmodSync(filePath, 0o755)
        }
        resolve(filePath)
      })
      writer.on("error", reject)
    })
  } catch (error) {
    return null
  }
}
async function StartCloudflaredTunnel(cloudflaredPath) {
  const localUrl = `http://localhost:${port}`
  return new Promise((resolve, reject) => {
    cloudflared = spawn(cloudflaredPath, ["tunnel", "--url", localUrl])
    cloudflared.stdout.on("data", (data) => {
      const output = data.toString()
      const urlMatch = output.match(/https:\/\/[^\s]+\.trycloudflare\.com/)
      if (urlMatch) {
        let url = urlMatch[0]
        resolve(url)
      }
    })
    cloudflared.stderr.on("data", (data) => {
      const output = data.toString()
      const urlMatch = output.match(/https:\/\/[^\s]+\.trycloudflare\.com/)
      if (urlMatch) {
        let url = urlMatch[0]
        resolve(url)
      }
    })
    cloudflared.on("close", (code) => {
      resolve(null)
    })
  })
}

const listen = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(enableCORS)
  app.use((req, res) =>
    res.status(404).send({
      status: false,
      error: {
        message: `The requested endpoint (${req.method.toLocaleUpperCase()} ${req.path}) was not found. please make sure to use "http://localhost:3040/v1" as the base URL.`,
        type: "invalid_request_error",
      },
      support: "https://discord.pawan.krd",
    }),
  )

  app.listen(port, async () => {
    if (process.env.CLOUDFLARED === undefined) process.env.CLOUDFLARED = "true"
    let cloudflared = process.env.CLOUDFLARED === "true"
    let filePath
    let publicURL
    if (cloudflared) {
      filePath = await DownloadCloudflared()
      publicURL = await StartCloudflaredTunnel(filePath)
    }
    console.log(`💡 Server is running at http://localhost:${port}`)
    console.log()
    console.log(`🔗 Local Base URL: http://localhost:${port}/v1`)
    console.log(`🔗 Local Endpoint: http://localhost:${port}/v1/chat/completions`)
    console.log()
    if (cloudflared && publicURL) console.log(`🔗 Public Base URL: ${publicURL}/v1`)
    if (cloudflared && publicURL) console.log(`🔗 Public Endpoint: ${publicURL}/v1/chat/completions`)
    else if (cloudflared && !publicURL) {
      console.log("🔗 Public Endpoint: (Failed to start cloudflared tunnel, please restart the server.)")
      if (filePath) fs.unlinkSync(filePath)
    }
    if (cloudflared && publicURL) console.log()
    console.log("📝 Author: Pawan.Krd")
    console.log(`🌐 Discord server: https://discord.gg/pawan`)
    console.log("🌍 GitHub Repository: https://github.com/PawanOsman/ChatGPT")
    console.log(`💖 Don't forget to star the repository if you like this project!`)
    console.log()
    setTimeout(async () => {
      while (true) {
        try {
          await getNewSessionId()
          await wait(refreshInterval)
        } catch (error) {
          console.error("Error refreshing session ID, retrying in 2 minute...")
          console.error("If this error persists, your country may not be supported yet.")
          console.error("If your country was the issue, please consider using a U.S. VPN.")
          await wait(errorWait)
        }
      }
    }, 0)
  })
}

export {
  baseUrl,
  apiUrl,
  StartCloudflaredTunnel,
  DownloadCloudflared,
  enableCORS,
  getNewSessionId,
  axiosInstance,
  StreamCompletion,
  linesToMessages,
  chunksToLines,
  GenerateCompletionId,
  refreshInterval,
  errorWait,
  cloudflared,
  token,
  oaiDeviceId,
  wait,
}
