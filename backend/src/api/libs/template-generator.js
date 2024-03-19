import { createEnvironment, createFilter, createFilesystemLoader } from "twing"
import fs from "fs"
import path from "path"
class TemplateGenerator {
  generatorTemplateDir = null
  router = null
  mWebTemplate = null
  mWebTemplateBlock = null
  mWebSectionBlock = null
  mWebBlock = null
  constructor(appConfig, router) {
    this.router = router
    this.appConfig = appConfig
    this.generatorTemplateDir = `${appConfig.get("basepath")}/templates/generator`
    this.mWebTemplate = router.mWebTemplate
    this.mWebTemplateBlock = router.mWebTemplateBlock
    this.mWebSectionBlock = router.mWebSectionBlock
    this.mWebBlock = router.mWebBlock
  }

  async generateTemplate(templateId) {
    let output = ""
    let success = false
    const template = await this.mWebTemplate.getByPk(templateId, true)
    if (template) {
      const twigLoader = createFilesystemLoader(fs)
      const templatePath = `./${this.generatorTemplateDir}/template/`
      console.log(fs.existsSync(templatePath))
      twigLoader.addPath(templatePath)
      const twigEnv = createEnvironment(twigLoader)

      this.router.initTargetDir(template.templateDir, template.templatePath)
      const sections = await this.mWebBlock.getList(templateId, 1, 100, "id", "asc", "section", null)
      console.log(sections)
      const templateData = {
        template,
        sections: sections.records,
      }

      output = await twigEnv.render("templateFile.twig", templateData)
      success = true
    }

    return [output, success]
  }
}

export { TemplateGenerator }
