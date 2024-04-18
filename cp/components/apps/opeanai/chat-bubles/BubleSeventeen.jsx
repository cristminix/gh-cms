import { cls28, cls22, cls21, cls20, cls19, cls18, cls17, cls76, cls75, cls74, cls73, cls72 } from "../cls"
const BubleSeventeen = ({}) => {
  return (
    <>
      {/*<!-- Chat Bubble -->*/}
      <li className={cls17}>
        <div className={cls18}>
          {/*<!-- Card -->*/}
          <div className={cls19}>
            <p className={cls20}>2 files uploaded</p>
          </div>
          {/*<!-- End Card -->*/}

          <ul className={cls72}>
            <li className={cls73}>
              <div className={cls74}>
                <span className={cls75}>resume_web_ui_developer.csv</span>
                <button type="button" className={cls76}>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"> </path>{" "}
                    <polyline points="7 10 12 15 17 10"> </polyline>{" "}
                    <line x1="12" x2="12" y1="15" y2="3">
                      {" "}
                    </line>{" "}
                  </svg>
                  Download
                </button>
              </div>
            </li>
            <li className={cls73}>
              <div className={cls74}>
                <span className={cls75}>coverletter_web_ui_developer.pdf</span>
                <button type="button" className={cls76}>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"> </path>{" "}
                    <polyline points="7 10 12 15 17 10"> </polyline>{" "}
                    <line x1="12" x2="12" y1="15" y2="3">
                      {" "}
                    </line>{" "}
                  </svg>
                  Download
                </button>
              </div>
            </li>
          </ul>
        </div>

        <span className={cls21}>
          <span className={cls22}> AZ </span>
        </span>
      </li>
      {/*<!-- End Chat Bubble -->*/}
    </>
  )
}

export default BubleSeventeen
