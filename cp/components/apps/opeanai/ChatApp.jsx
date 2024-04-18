import { useState } from "react"
import Search from "./Search"
import Title from "./TItle"
import { cls1, cls0 } from "./cls"
import ChatBuble from "./ChatBuble"

const ChatApp = ({ prompt, bubles = [], gptLoading }) => {
  return (
    <>
      {/*<!-- Content -->*/}
      <div className={cls0}>
        <div className={cls1}>{/* <Title /> */}</div>
        <ChatBuble bubles={bubles} />
        <Search prompt={prompt} gptLoading={gptLoading} />
      </div>
      {/*<!-- End Content -->*/}
    </>
  )
}

export default ChatApp
