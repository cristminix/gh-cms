import config from "./actions.json" assert { type: "json" }
import { importActionModules, showHelp, getActionArgs, processAction, snakeToCamel } from "./fn.mjs"
// console.log(process.argv)

const main = async () => {
  // process.removeAllListeners('warning')

  let { argv } = process
  const { availables } = config

  const moduleActions = await importActionModules(availables)
  //   console.log(argv)
  try {
    if (argv[2].match(/-/)) {
      argv[2] = snakeToCamel(argv[2])
    }
  } catch (e) {}

  let actionName = getActionArgs(argv)

  if (actionName) {
    await processAction(actionName, argv, moduleActions, availables)
  } else {
    showHelp(availables, moduleActions)
  }

  // process.exit(0)
}

main()
