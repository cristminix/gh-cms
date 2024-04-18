import { useRef } from "react"
import {
  cls90,
  cls89,
  cls88,
  cls87,
  cls86,
  cls85,
  cls84,
  cls83,
  cls82,
  cls81,
  cls80,
  cls79,
  cls78,
  cls77,
  cls28,
} from "./cls"
const Search = ({ prompt, gptLoading }) => {
  const inputTextRef = useRef(null)
  const doChat = async () => {
    const text = inputTextRef.current.value
    const chatCompletion = await prompt(text)
    // console.log(chatCompletion)
    inputTextRef.current.value = ""
  }
  return (
    <>
      {/*<!-- Search -->*/}
      <footer className={cls77}>
        <div className={cls78}>
          <button type="button" className={`${cls79} hidden`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cls28}
            >
              {" "}
              <path d="M5 12h14"> </path> <path d="M12 5v14"> </path>{" "}
            </svg>
            New chat
          </button>
          {gptLoading && (
            <button type="button" className={cls80}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={cls81}
              >
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z">
                  {" "}
                </path>
              </svg>
              Stop generating
            </button>
          )}
        </div>

        {/*<!-- Input -->*/}
        <div className={cls82}>
          <textarea placeholder="Ask me anything..." className={cls83} ref={inputTextRef} />

          {/*<!-- Toolbar -->*/}
          <div className={cls84}>
            <div className={cls85}>
              {/*<!-- Button Group -->*/}
              <div className={cls86}>
                {/*<!-- Mic Button -->*/}
                <button type="button" className={cls87}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cls28}
                  >
                    {" "}
                    <rect width="18" height="18" x="3" y="3" rx="2">
                      {" "}
                    </rect>{" "}
                    <line x1="9" x2="15" y1="15" y2="9">
                      {" "}
                    </line>{" "}
                  </svg>
                </button>
                {/*<!-- End Mic Button -->*/}

                {/*<!-- Attach Button -->*/}
                <button type="button" className={cls87}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cls28}
                  >
                    {" "}
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48">
                      {" "}
                    </path>{" "}
                  </svg>
                </button>
                {/*<!-- End Attach Button -->*/}
              </div>
              {/*<!-- End Button Group -->*/}

              {/*<!-- Button Group -->*/}
              <div className={cls88}>
                {/*<!-- Mic Button -->*/}
                <button type="button" className={cls87}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cls28}
                  >
                    {" "}
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"> </path>{" "}
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"> </path>{" "}
                    <line x1="12" x2="12" y1="19" y2="22">
                      {" "}
                    </line>{" "}
                  </svg>
                </button>
                {/*<!-- End Mic Button -->*/}

                {/*<!-- Send Button -->*/}
                <button type="button" className={cls89} onClick={(e) => doChat()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={cls90}
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z">
                      {" "}
                    </path>
                  </svg>
                </button>
                {/*<!-- End Send Button -->*/}
              </div>
              {/*<!-- End Button Group -->*/}
            </div>
          </div>
          {/*<!-- End Toolbar -->*/}
        </div>
        {/*<!-- End Input -->*/}
      </footer>
      {/*<!-- End Search -->*/}
    </>
  )
}

export default Search
