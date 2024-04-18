import OpenAI from "openai"
import ChatApp from "./opeanai/ChatApp"
import { apiUrl } from "@lib/shared/fn"
import BubleTwo from "./opeanai/chat-bubles/BubleTwo"
import BubleThree from "./opeanai/chat-bubles/BubleThree"
import { useState } from "react"
const openai = new OpenAI({
  apiKey: "pk-RjIYvleyeXpgJMtxtunYCIbrnZhXdkzsnWPlRaeeMXaqErqg",
  baseURL: apiUrl("openai/v1"),
  dangerouslyAllowBrowser: true,
})
const generateKey = () => {
  return new Date().getTime().toString()
}
const OpenAIChat = ({}) => {
  const [bubles, setBubles] = useState([])
  const [gptLoading, setGptLoading] = useState(false)

  const prompt = async (text) => {
    setGptLoading(true)
    setBubles((o_bubles) => [...o_bubles, <BubleTwo key={generateKey()} text={text} />])
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: text }],
        model: "gpt-3.5-turbo",
      })

      // console.log(openai)
      const output = chatCompletion.choices[0].message.content
      setBubles((o_bubles) => [...o_bubles, <BubleThree key={generateKey()} text={output} />])

      return output

      // console.log(chatCompletion.choices[0].message.content);
    } catch (e) {
      setBubles((o_bubles) => [...o_bubles, <BubleThree key={generateKey()} text={e.toString()} />])
      console.error(e)
    }
    setGptLoading(false)

    // process.exit(1)
  }

  return (
    <>
      <div className="flex gap-2">
        <ChatApp prompt={prompt} bubles={bubles} gptLoading={gptLoading} />
      </div>
    </>
  )
}

export default OpenAIChat
