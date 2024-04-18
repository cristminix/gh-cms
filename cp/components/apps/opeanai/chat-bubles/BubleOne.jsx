import { cls9, cls10, cls11, cls14, cls15, cls16, cls13, cls12 } from "../cls"
const BubleOne = ({}) => {
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

        {/*<!-- Card -->*/}
        <div className={cls11}>
          <h2 className={cls12}>How can we help?</h2>
          <div className={cls13}>
            <p className={cls14}>You can ask questions like:</p>
            <ul className={cls15}>
              <li className={cls16}>What&apos;s Preline UI?</li>

              <li className={cls16}>How many Starter Pages &amp; Examples are there?</li>

              <li className={cls16}>Is there a PRO version?</li>
            </ul>
          </div>
        </div>
        {/*<!-- End Card -->*/}
      </li>
      {/*<!-- End Chat Bubble -->*/}
    </>
  )
}

export default BubleOne
