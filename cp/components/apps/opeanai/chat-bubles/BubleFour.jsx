import { cls21, cls22, cls20, cls19, cls18, cls17, cls32, cls28, cls31 } from "../cls"
const BubleFour = ({}) => {
  return (
    <>
      {/*<!-- Chat Bubble -->*/}
      <li className={cls17}>
        <div className={cls18}>
          {/*<!-- Card -->*/}
          <div className={cls19}>
            <p className={cls20}>what&apos;s preline ui figma?</p>
            <div className={cls31}>
              <button type="button" className={cls32}>
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
                  <polygon points="5 3 19 12 5 21 5 3"> </polygon>{" "}
                </svg>
                Voice message
              </button>
            </div>
          </div>
          {/*<!-- End Card -->*/}
        </div>

        <span className={cls21}>
          <span className={cls22}> AZ </span>
        </span>
      </li>
      {/*<!-- End Chat Bubble -->*/}
    </>
  )
}

export default BubleFour
