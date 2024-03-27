import { createElement, createRef } from "react"
class HotModuleReloadSetup {
  static instance = null
  static getInstance(options) {
    if (!HotModuleReloadSetup.instance) {
      HotModuleReloadSetup.instance = new HotModuleReloadSetup(options)
    }
    return HotModuleReloadSetup.instance
  }
  constructor(options = { onHotReload: (f) => f }) {
    this.modules = {}
    this.instances = {}
    this.constructorArgs = {}
    this.options = options

    document.body.addEventListener("hot-module-reload", (event) => {
      console.log("hmr-event-triggered")
      const { newModule } = event.detail
      console.log(newModule)
      const instance = HotModuleReloadSetup.getInstance()
      if (instance) {
        const { onHotReload } = instance.options
        if (onHotReload) {
          onHotReload("refresh-parent")
        }
      }
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
