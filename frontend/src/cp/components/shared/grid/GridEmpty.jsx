const GridItemEmpty = ({ spanCls, limit, options }) => {
  // console.log(options)
  const colSpan = options.fields.length + 2
  // const arrLength = lastLength ? lastLength : limit
  const dummyRecords = [0]
  return (
    <>
      {dummyRecords.map((value, index) => {
        return (
          <tr className="" key={index}>
            <td colSpan={colSpan} className="text-center p-8">
              <span className="text-xs italic text-red-500">
                <i className="fa fa-exclamation-triangle"></i> No records
              </span>
            </td>
          </tr>
        )
      })}
    </>
  )
}

export default GridItemEmpty
