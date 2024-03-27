import { createElement, createRef } from "react"
class HotModuleReloadSetup {
  constructor(options = { onHotReload: (f) => f }) {
    this.modules = {}
    this.instances = {}
    this.constructorArgs = {}
    this.options = options

    document.body.addEventListener("hot-module-reload", (event) => {
      const { newModule } = event.detail
      this.swapModule(newModule)
    })
  }

  swapModule(newModule) {
    const name = newModule.default.name
    const oldModule = this.modules[name]
    const oldInstance = this.instances[name]
    if (!oldModule) return

    const newInstance = createElement(newModule.default, this.options)
    // newInstance.hotReload(oldInstance)
    const { onHotReload } = this.options
    if (onHotReload) {
      onHotReload(newInstance)
    }

    this.modules[name] = newModule
    this.instances[name] = newInstance
  }

  import(newModule, ...args) {
    const newInstance = createElement(newModule.default, this.options)

    const name = newModule.default.name
    this.modules[name] = newModule
    this.instances[name] = newInstance
    this.constructorArgs[name] = args
  }
}

export default HotModuleReloadSetup

export function HMREventHandler(newModule) {
  const event = new CustomEvent("hot-module-reload", { detail: { newModule } })
  document.body.dispatchEvent(event)
}
