import { github } from "./github"
export const git = {
  clone: async (callback) => {
    // callback(null)
    const logs = []
    let ls = await github.isCloned()
    if (ls) {
      logs.push(ls)
    } else {
      logs.push(`cloning repo`)
      const { success, error } = await github.clone()
      logs.push(success)
    }
    logs.push(await github.status("README.MD"))
    await github.writeFile(`README.md`, "Update one two three kanzul ulum README")

    logs.push(await github.status("README.md"))
    await github.add("README.md")

    logs.push(await github.status("README.md"))
    let sha = await github.commit("Overwrite USING new README.")
    let pushResult = await github.push()
    logs.push(pushResult)
    logs.push(sha)
    callback([...logs])
  },
}
