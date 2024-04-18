import { cls27, cls26, cls25, cls24, cls23, cls16, cls13, cls11, cls10, cls9, cls30, cls28, cls29 } from "../cls"
const BubleThree = ({ text = "Hello" }) => {
  return (
    <>
      {/*<!-- Chat Bubble -->*/}
      <li className={cls9}>
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cls10}
        >
          <rect width="38" height="38" rx="6" fill="#2563EB">
            {" "}
          </rect>
          <path
            d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25"
            stroke="white"
            strokeWidth="1.5"
          >
            {" "}
          </path>
          <path
            d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25"
            stroke="white"
            strokeWidth="1.5"
          >
            {" "}
          </path>
          <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white">
            {" "}
          </ellipse>
        </svg>

        <div className={cls23}>
          {/*<!-- Card -->*/}
          <div className={cls11}>{text}</div>
          {/*<!-- End Card -->*/}

          {/*<!-- Button Group -->*/}
          <div>
            <div className={cls25}>
              <div>
                <div className={cls26}>
                  <button type="button" className={cls27}>
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
                      <path d="M7 10v12"> </path>{" "}
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z">
                        {" "}
                      </path>{" "}
                    </svg>
                  </button>
                  <button type="button" className={cls27}>
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
                      <path d="M17 14V2"> </path>{" "}
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z">
                        {" "}
                      </path>{" "}
                    </svg>
                  </button>
                </div>
                <button type="button" className={cls29}>
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
                    <path d="M17 14V2"> </path>{" "}
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z">
                      {" "}
                    </path>{" "}
                  </svg>
                  Copy
                </button>
                <button type="button" className={cls29}>
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
                    <circle cx="18" cy="5" r="3">
                      {" "}
                    </circle>{" "}
                    <circle cx="6" cy="12" r="3">
                      {" "}
                    </circle>{" "}
                    <circle cx="18" cy="19" r="3">
                      {" "}
                    </circle>{" "}
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49">
                      {" "}
                    </line>{" "}
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49">
                      {" "}
                    </line>{" "}
                  </svg>
                  Share
                </button>
              </div>

              <div className={cls30}>
                <button type="button" className={cls29}>
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
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"> </path> <path d="M21 3v5h-5"> </path>{" "}
                  </svg>
                  New answer
                </button>
              </div>
            </div>
          </div>
          {/*<!-- End Button Group -->*/}
        </div>
      </li>
      {/*<!-- End Chat Bubble -->*/}
    </>
  )
}

export default BubleThree
