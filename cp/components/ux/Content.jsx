import ExampleContent from "./ExampleContent"

const Content = ({ store, config, showCaptionMenu }) => {
  return (
    <>
      {/*<!-- Content -->*/}
      <ExampleContent store={store} config={config} showCaptionMenu={showCaptionMenu} />
      {/*<!-- End Content -->*/}{" "}
    </>
  )
}

export default Content
