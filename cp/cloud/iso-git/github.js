import isoGit from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import config from "../../../config/cp.json"

const getRepoDir = (url) => {
  let urlSplit = url.split("/")
  const dir = urlSplit[urlSplit.length - 1]
  return `/${dir}`
}

class Github {
  url = ""
  token = ""
  remote = ""
  git = null
  fs = null
  dir = ""
  options = null
  pushOptions = null
  corsProxyUrl = null

  author = {
    name: "GH-CMS Backend",
    email: "gh-cms-backend@noreply.com",
  }
  constructor(url, token, corsProxyUrl) {
    this.git = isoGit
    this.url = url
    this.token = token
    this.remote = url.replace("github.com", `${token}@github.com`)
    this.fs = new LightningFS()
    this.fs.init("fs")
    this.fsp = this.fs.promises
    this.dir = getRepoDir(url)
    this.corsProxyUrl = corsProxyUrl
    this.options = {
      fs: this.fs,
      http,
      dir: this.dir,
      url:this.remote,
    }
    this.pushOptions ={
      fs: this.fs,
      http,
      dir: this.dir,
      url: this.remote
    } 
  }
  disableCorsProxy() {
    delete this.options.corsProxy
    delete this.pushOptions.corsProxy
  }
  enableCorsProxy(flag = true) {
    if (!flag) return this.disableCorsProxy()
    this.options.corsProxy = this.corsProxyUrl
    this.pushOptions.corsProxy = this.corsProxyUrl
  }
  async wipe() {
    await this.fs.init("fs", {
      wipe: true,
    })
    await this.fsp.mkdir(this.dir)
  }
  async isCloned() {
    const { fsp, dir } = this
    try {
      const ls = await fsp.readdir(dir)
      if (ls.length === 0) return false
      if (await fsp.stat(`${this.dir}/.git`)) {
        return true
      }
    } catch (e) {}

    return false
  }

  async clone() {
    const { git, fsp, dir, options } = this

    let error, success
    try {
      await git.clone({
        ...options,
        onProgress: (event) => {
          console.log(event.phase)
          if (event.total) {
            console.log(event.loaded / event.total)
          } else {
            console.log(event.loaded)
          }
        },
      })

      success = await fsp.readdir(dir)
    } catch (e) {
      error = e.toString()
    }
    return { success, error }
  }

  async pull() {
    const { git, fsp, dir, options } = this

    let error, success
    try {
      await git.pull(options)

      success = await fsp.readdir(dir)
    } catch (e) {
      error = e.toString()
    }
    return { success, error }
  }

  async add(filepath) {
    const { git, fs, dir } = this
    return await git.add({ fs, dir, filepath })
  }
  async remove(filepath) {
    const { git, fs, dir } = this
    return await git.remove({ fs, dir, filepath })
  }
  async log() {
    const { git, fs, dir } = this
    return await git.log({ fs, dir })
  }
  async status(filepath) {
    const { git, fs, dir } = this
    return await git.status({ fs, dir, filepath })
  }

  async isDirty(baseDir) {}

  async commit(message) {
    const { author, fs, dir, git } = this
    let sha = await git.commit({
      fs,
      dir,
      message,
      author,
    })
    return sha
  }

  async push() {
    const { git, pushOptions } = this
    console.log(pushOptions)
    return git.push(pushOptions)
  }
  async writeFile(path, content) {
    const { fsp, dir } = this

    return await fsp.writeFile(`${dir}/${path}`, content, "utf8")
  }
}
export const github = new Github(config.githubRepo, config.githubToken, config.corsProxyUrl)
