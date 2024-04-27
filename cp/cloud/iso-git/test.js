import isoGit from "isomorphic-git"
import http from "isomorphic-git/http/web"
import LightningFS from "@isomorphic-git/lightning-fs"
import cp from "../../../config/cp.json"
const fs = new LightningFS("fs")
const dir = "/test-clone"
// console.log(cp)
const pfs = fs.promises
export const git = {
  clone: async (callback) => {
    // callback(null)
    const logs = []
    if (await fs.promises.stat(dir)) {
      logs.push(await fs.promises.readdir(dir))
    } else {
      try {
        const o = await isoGit.clone({
          fs,
          http,
          dir,
          url: cp.githubRepo,
          corsProxy: cp.corsProxyUrl,
        })

        logs.push(await fs.promises.readdir(dir))
      } catch (e) {
        logs.push(e.toString())
      }
    }
    logs.push(await isoGit.status({ fs, dir, filepath: "README.MD" }))
    await pfs.writeFile(`${dir}/README.md`, "Update kanzul ulum README", "utf8")
    logs.push(await isoGit.status({ fs, dir, filepath: "README.md" }))
    await isoGit.add({ fs, dir, filepath: "README.md" })
    logs.push(await isoGit.status({ fs, dir, filepath: "README.md" }))
    // logs.push(await isoGit.log({ fs, dir }))
    let sha = await isoGit.commit({
      fs,
      dir,
      message: "Overwrite README.",
      author: {
        name: "Mr. Original",
        email: "mrFuckme@example.com",
      },
    })
    const pushUrl = cp.githubRepo.replace("github.com", `${cp.githubToken}@github.com`)
    console.log(pushUrl)
    let pushResult = await isoGit.push({
      fs,
      http,
      dir,
      url: pushUrl,
      corsProxy: cp.corsProxyUrl,
      //   onAuth: () => ({ username: "kanzululum", password: cp.githubToken }),
    })
    logs.push(pushResult)
    logs.push(sha)
    callback([...logs])
  },
}
