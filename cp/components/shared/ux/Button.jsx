import { forwardRef } from "react"

const Button = forwardRef(
  (
    {
      title = "",
      iconPos = "left",
      label = null,
      onMouseOver = (f) => f,
      onMouseOut = (f) => f,
      disabled = false,
      loading = false,
      icon,
      className,
      caption,
      onClick,
      id = null,
    },
    ref,
  ) => {
    const btnCls =
      "inline-flex grow-0 flex-shrink-0 justify-center items-center gap-2 p-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
    return (
      <>
        {/* <div className="flex"> */}
        {
          // label ? <label>{label}</label>:''
        }
        <button
          id={id}
          ref={ref}
          title={title}
          onMouseOver={(e) => onMouseOver(e)}
          onMouseOut={(e) => onMouseOut(e)}
          disabled={loading || disabled}
          onClick={(e) => onClick(e)}
          type="button"
          className={` ${btnCls} ${className}`}
        >
          {loading ? (
            <span
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </span>
          ) : (
            ""
          )}
          {icon && !loading && iconPos == "left" ? <i className={icon} /> : ""}
          {caption ? <span>{caption}</span> : ""}
          {icon && !loading && iconPos != "left" ? <i className={icon} /> : ""}
        </button>
      </>
    )
    {
      /* </div> */
    }
  },
)

export default Button
