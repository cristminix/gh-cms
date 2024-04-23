import OpenAI from "openai"
import ChatApp from "./opeanai/ChatApp"
import { apiUrl } from "@lib/shared/fn"
import BubleTwo from "./opeanai/chat-bubles/BubleTwo"
import BubleThree from "./opeanai/chat-bubles/BubleThree"
import { useEffect, useRef, useState } from "react"
import UserData from "@cp/global/models/UserData"
const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
})
const generateKey = () => {
  return new Date().getTime().toString()
}
const OpenAIChat = ({ config, store }) => {
  const [bubles, setBubles] = useState([])
  const [bublesData, setBublesData] = useState([])
  const [gptLoading, setGptLoading] = useState(false)
  const gptLoadingRef = useRef(gptLoading)
  const prompt = async (text) => {
    setGptLoading(true)
    gptLoadingRef.current = true
    setBublesData((o_bublesData) => [...o_bublesData, { text, t: "input" }])
    setBubles((o_bubles) => [...o_bubles, <BubleTwo key={generateKey()} text={text} />])
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: text }],
        model: "gpt-3.5-turbo",
      })

      // console.log(openai)
      const output = chatCompletion.choices[0].message.content
      setBubles((o_bubles) => [...o_bubles, <BubleThree key={generateKey()} text={output} />])
      setBublesData((o_bublesData) => [...o_bublesData, { text: output, t: "output" }])

      setGptLoading(false)

      return output

      // console.log(chatCompletion.choices[0].message.content);
    } catch (e) {
      setBubles((o_bubles) => [...o_bubles, <BubleThree key={generateKey()} text={e.toString()} />])
      console.error(e)
    }
    setGptLoading(false)

    // process.exit(1)
  }
  const loadSavedBubles = async () => {
    let ls = localStorage.bubles || "[]"

    try {
      ls = JSON.parse(ls)
      // setBubles(ls)
    } catch (e) {}
    console.log(ls)
    ls.map((buble, index) => {
      setBubles((o_bubles) => [
        ...o_bubles,
        buble.t == "output" ? <BubleThree key={index} text={buble.text} /> : <BubleTwo key={index} text={buble.text} />,
      ])
    })
    // const mUserData = UserData.getInstance()
    // await mUserData.connect()
    // const bubles = await mUserData.get("bubles")
    // console.log(bubles)
  }
  useEffect(() => {
    if (bubles.length == 0) {
      loadSavedBubles()
    } else {
      localStorage.bubles = JSON.stringify(bublesData)
    }
  }, [bublesData])
  return (
    <>
      <div className="flex gap-2">
        <ChatApp prompt={prompt} bubles={bubles} gptLoading={gptLoading} store={store} />
      </div>
    </>
  )
}

export default OpenAIChat
