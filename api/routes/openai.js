import express from "express"
import { generateAccessToken } from "../libs/fn.js"
import {
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
} from "../libs/openai/fn.js"
import { encode } from "gpt-3-encoder"
import { randomUUID } from "crypto"

import multer from "multer"
class OpenAIRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  multer = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.logger = logger
    this.multer = multer()
    this.router = express.Router()
    this.initRouter()
  }
  async handleChatCompletion(req, res) {
    console.log(req.body)
    console.log(
      "Request:",
      `${req.method} ${req.originalUrl}`,
      `${req.body?.messages?.length ?? 0} messages`,
      req.body.stream ? "(stream-enabled)" : "(stream-disabled)",
    )
    try {
      const body = {
        action: "next",
        messages: req.body.messages.map((message) => ({
          author: { role: message.role },
          content: { content_type: "text", parts: [message.content] },
        })),
        parent_message_id: randomUUID(),
        model: "text-davinci-002-render-sha",
        timezone_offset_min: -180,
        suggestions: [],
        history_and_training_disabled: true,
        conversation_mode: { kind: "primary_assistant" },
        websocket_request_id: randomUUID(),
      }
      let promptTokens = 0
      let completionTokens = 0
      for (let message of req.body.messages) {
        promptTokens += encode(message.content).length
      }
      const response = await axiosInstance.post(apiUrl, body, {
        responseType: "stream",
        headers: {
          "oai-device-id": oaiDeviceId,
          "openai-sentinel-chat-requirements-token": token,
        },
      })
      if (req.body.stream) {
        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")
      } else {
        res.setHeader("Content-Type", "application/json")
      }
      let fullContent = ""
      let requestId = GenerateCompletionId("chatcmpl-")
      let created = Math.floor(Date.now() / 1000)
      let finish_reason = null
      for await (const message of StreamCompletion(response.data)) {
        console.log(message)
        if (message.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{6}$/)) continue
        const parsed = JSON.parse(message)
        let content = parsed?.message?.content?.parts[0] ?? ""
        let status = parsed?.message?.status ?? ""
        for (let message of req.body.messages) {
          if (message.content === content) {
            content = ""
            break
          }
        }
        switch (status) {
          case "in_progress":
            finish_reason = null
            break
          case "finished_successfully":
            let finish_reason_data = parsed?.message?.metadata?.finish_details?.type ?? null
            switch (finish_reason_data) {
              case "max_tokens":
                finish_reason = "length"
                break
              case "stop":
              default:
                finish_reason = "stop"
            }
            break
          default:
            finish_reason = null
        }
        if (content === "") continue
        let completionChunk = content.replace(fullContent, "")
        completionTokens += encode(completionChunk).length
        if (req.body.stream) {
          let response = {
            id: requestId,
            created: created,
            object: "chat.completion.chunk",
            model: "gpt-3.5-turbo",
            choices: [
              {
                delta: {
                  content: completionChunk,
                },
                index: 0,
                finish_reason: finish_reason,
              },
            ],
          }
          res.write(`data: ${JSON.stringify(response)}\n\n`)
        }
        fullContent = content.length > fullContent.length ? content : fullContent
      }
      if (req.body.stream) {
        res.write(
          `data: ${JSON.stringify({
            id: requestId,
            created: created,
            object: "chat.completion.chunk",
            model: "gpt-3.5-turbo",
            choices: [
              {
                delta: {
                  content: "",
                },
                index: 0,
                finish_reason: finish_reason,
              },
            ],
          })}\n\n`,
        )
      } else {
        res.write(
          JSON.stringify({
            id: requestId,
            created: created,
            model: "gpt-3.5-turbo",
            object: "chat.completion",
            choices: [
              {
                finish_reason: finish_reason,
                index: 0,
                message: {
                  content: fullContent,
                  role: "assistant",
                },
              },
            ],
            usage: {
              prompt_tokens: promptTokens,
              completion_tokens: completionTokens,
              total_tokens: promptTokens + completionTokens,
            },
          }),
        )
      }
      res.end()
    } catch (error) {
      console.error(error)
      if (!res.headersSent) res.setHeader("Content-Type", "application/json")
      res.write(
        JSON.stringify({
          status: false,
          error: {
            message:
              "An error occurred. Please check the server console to confirm it is ready and free of errors. Additionally, ensure that your request complies with OpenAI's policy.",
            type: "invalid_request_error",
          },
          support: "https://discord.pawan.krd",
        }),
      )
      res.end()
    }
  }
  getRouter() {
    return this.router
  }

  async initRouter() {
    this.router.post("/openai/v1/chat/completions", (req, res) => this.handleChatCompletion(req, res))
    // const port = 7700
    // if (process.env.CLOUDFLARED === undefined) process.env.CLOUDFLARED = "false"
    // let cloudflared = process.env.CLOUDFLARED === "true"
    // let filePath
    // let publicURL
    // if (cloudflared) {
    //   filePath = await DownloadCloudflared()
    //   publicURL = await StartCloudflaredTunnel(filePath)
    // }
    // console.log(`💡 Server is running at http://localhost:${port}`)
    // console.log()
    // console.log(`🔗 Local Base URL: http://localhost:${port}/v1`)
    // console.log(`🔗 Local Endpoint: http://localhost:${port}/v1/chat/completions`)
    // console.log()
    // if (cloudflared && publicURL) console.log(`🔗 Public Base URL: ${publicURL}/v1`)
    // if (cloudflared && publicURL) console.log(`🔗 Public Endpoint: ${publicURL}/v1/chat/completions`)
    // else if (cloudflared && !publicURL) {
    //   console.log("🔗 Public Endpoint: (Failed to start cloudflared tunnel, please restart the server.)")
    //   if (filePath) fs.unlinkSync(filePath)
    // }
    // if (cloudflared && publicURL) console.log()
    // console.log("📝 Author: Pawan.Krd")
    // console.log(`🌐 Discord server: https://discord.gg/pawan`)
    // console.log("🌍 GitHub Repository: https://github.com/PawanOsman/ChatGPT")
    // console.log(`💖 Don't forget to star the repository if you like this project!`)
    // console.log()
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
  }
}

export default OpenAIRouter
