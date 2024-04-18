import BubleEight from "./chat-bubles/BubleEight"
import BubleEleven from "./chat-bubles/BubleEleven"
import BubleFive from "./chat-bubles/BubleFive"
import BubleFiveteen from "./chat-bubles/BubleFiveteen"
import BubleFour from "./chat-bubles/BubleFour"
import BubleFourteen from "./chat-bubles/BubleFourteen"
import BubleNine from "./chat-bubles/BubleNine"
import BubleOne from "./chat-bubles/BubleOne"
import BubleSeven from "./chat-bubles/BubleSeven"
import BubleSeventeen from "./chat-bubles/BubleSeventeen"
import BubleSix from "./chat-bubles/BubleSix"
import BubleSixteen from "./chat-bubles/BubleSixteen"
import BubleTen from "./chat-bubles/BubleTen"
import BubleThirteen from "./chat-bubles/BubleThirteen"
import BubleThree from "./chat-bubles/BubleThree"
import BubleTwelve from "./chat-bubles/BubleTwelve"
import BubleTwo from "./chat-bubles/BubleTwo"
import { cls8 } from "./cls"
const ChatBuble = ({ bubles = [] }) => {
  return (
    <>
      <ul className={cls8}>
        {bubles.map((buble, index) => {
          return buble
        })}
        {/* <BubleTwo />
        <BubleThree />

        <BubleOne />

        <BubleThree />
        <BubleFour />
        <BubleFive />

        <BubleSix />

        <BubleSeven />
        <BubleEight />
        <BubleNine />
        <BubleTen />
        <BubleEleven />
        <BubleTwelve />
        <BubleThirteen />
        <BubleFourteen />
        <BubleFiveteen />
        <BubleSixteen />
        <BubleSeventeen /> */}
      </ul>
    </>
  )
}

export default ChatBuble
