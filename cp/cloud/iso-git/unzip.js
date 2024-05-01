import JSZip, { JSZipObject } from "jszip"
const mkdirp = {
  sync: async (path, fs) => {
    const pathSplit = path.split("/").filter((item) => item.length > 0)
    pathSplit[0] = `/${pathSplit[0]}`
    let dirname = ""
    let index = 0
    for (const name of pathSplit) {
      if (index === 0) dirname = name
      else dirname = `${dirname}/${name}`
      try {
        await fs.promises.mkdir(dirname)
      } catch (error) {}
      index += 1
    }
  },
}
const path = {
  join: (a, b) => {
    return [a, b].join("/").replace(/\/$/, "")
  },
  dirname: (a) => {
    const pathSplit = a.split("/")
    pathSplit.pop()
    return pathSplit.join("/")
  },
}

const writeFileSync = async (fs, outf, data) => {
  await fs.promises.writeFile(outf, data)
}

async function unzip(zipfile, opts) {
  const { odir, fs } = opts
  const z = await JSZip.loadAsync(await open(zipfile))
  const promises = []
  z.forEach((relativePath, entry) => {
    promises.push(
      (async () => {
        const outf = path.join(odir, relativePath)
        if (entry.dir) {
          mkdirp.sync(outf, fs)
        } else {
          mkdirp.sync(path.dirname(outf), fs)
          writeFileSync(fs, outf, await entry.async("uint8array"))
        }
      })(),
    )
  })
  await Promise.all(promises)
}

async function open(zipfile) {
  if (typeof zipfile === "string") {
    return fs.readFileSync ? fs.readFileSync(zipfile) : new Uint8Array(await (await fetch(zipfile)).arrayBuffer())
  } else if (zipfile instanceof ArrayBuffer) {
    return new Uint8Array(zipfile)
  } else return zipfile
}

export default unzip
