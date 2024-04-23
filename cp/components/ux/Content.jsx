import ExampleContent from "./ExampleContent"

const Content = ({ isLogedIn, store, config, showCaptionMenu }) => {
  return (
    <>
      {/*<!-- Content -->*/}
      <ExampleContent isLogedIn={isLogedIn} store={store} config={config} showCaptionMenu={showCaptionMenu} />
      {/*<!-- End Content -->*/}{" "}
    </>
  )
}

export default Content
