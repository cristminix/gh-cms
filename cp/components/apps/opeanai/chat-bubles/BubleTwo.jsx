import { cls17, cls18, cls19, cls20, cls21, cls22 } from "../cls"
const BubleTwo = ({ text = "input text" }) => {
  return (
    <>
      {/*<!-- Chat Bubble -->*/}
      <li className={cls17}>
        <div className={cls18}>
          {/*<!-- Card -->*/}
          <div className={cls19}>
            <p className={cls20}>{text}</p>
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

export default BubleTwo
