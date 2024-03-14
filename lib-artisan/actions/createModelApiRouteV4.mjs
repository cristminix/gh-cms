import { camelToDashCase, jsonParseFile, writeFile } from "./lib.mjs"
import { createEnvironment, createArrayLoader, createFilesystemLoader } from "twing"

import fs from "fs"
const createModelApiRouteV4 = async (table_name) => {
  const configPath = "config/create-model-api-route-v4.json"
  if (!fs.existsSync(configPath)) {
    console.error(`invalid config path ${configPath}`)
    return
  }
  const config = await jsonParseFile(configPath, null, "", null, true)
  console.log(`createModelApiRouteV4`)
  console.log(config)
  const { dataSourceConfig, outDir, routeConfig, availables } = config
  const dataSourceConfigData = await jsonParseFile(dataSourceConfig, null, "", null, true)
  let schemaDef = null
  try {
    schemaDef = dataSourceConfigData.schema[table_name]
  } catch (e) {}

  if (!schemaDef) {
    console.error(`schema def not found for table name ${table_name} on ${dataSourceConfig}`)
    return
  }
  console.log(schemaDef)
  if (typeof availables[table_name] === "undefined") {
    console.error(`invalid table name ${table_name} on ${configPath}`)
    return
  }
  const options = availables[table_name]

  const twigLoader = createFilesystemLoader(fs)
  twigLoader.addPath("./lib-artisan/actions/create-model-api-route-v4/templates/")
  const twigEnv = createEnvironment(twigLoader)
  const ctl = camelToDashCase(schemaDef.model)
  const modelInstanceName = schemaDef.model.toLowerCase()
  let requiredFields = schemaDef.fields.filter((i) => !schemaDef.nullable.includes(i) && i != schemaDef.pk)
  const requiredFieldLabels = requiredFields.join(", ")

  let requiredFieldValidations = []

  if (Array.isArray(options.requiredFields)) {
    options.requiredFields.map((field) => {
      requiredFieldValidations.push({
        field,
        message: `${field} is required`,
      })
    })
  } else {
    requiredFields.map((field) => {
      requiredFieldValidations.push({
        field,
        message: `${field} is required`,
      })
    })
  }

  const templateData = {
    options,
    schemaDef,
    ctl,
    modelInstanceName,
    requiredFieldLabels,
    requiredFieldValidations,
  }
  console.log(templateData)

  let outputContentBuffer = await twigEnv.render("routerFile.twig", templateData)
  const outputPath = `${outDir}/${ctl}.js`
  await writeFile(outputPath, outputContentBuffer, `create route ${schemaDef.model} on ${outDir}`)
  const routerConfig = await jsonParseFile(routeConfig, null, "", null, true)

  await updateRouterConfig(ctl, routerConfig, routeConfig)
}

const updateRouterConfig = async (ctl, routeConfig, routeConfigJson) => {
  if (routeConfig) {
    console.log(`updating route config on ${routeConfigJson}`)
    if (routeConfig.availables) {
      routeConfig.availables[ctl] = {
        routePath: `/api/cms/${ctl}`,
        routes: {
          list: {
            path: "{routePath}s",
            authenticated: false,
            groups: [],
            method: "get",
            controller: "getList",
            queryStrings: {
              order_by: {
                type: "string",
                defaultValue: "id",
              },
              order_dir: {
                type: "string",
                defaultValue: "asc",
              },
              limit: {
                type: "int",
                defaultValue: 5,
              },
              page: {
                type: "int",
                defaultValue: 1,
              },
            },
          },
          create: {
            path: "{routePath}/create",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "create",
          },
          update: {
            path: "{routePath}/update",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "update",
            queryStrings: {
              id: {
                type: "int",
                required: true,
              },
            },
          },
          delete: {
            path: "{routePath}/delete",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "delete",
            postData: {
              id: {
                type: "int",
                required: true,
              },
            },
          },
        },
      }
      await writeFile(routeConfigJson, JSON.stringify(routeConfig, null, 2), `updating route config ${routeConfigJson}`)
    } else {
      console.error(`invalid route config on ${routeConfigJson}`)
      process.exit(1)
    }
  } else {
    console.error(`unable to update route config on ${routeConfigJson}`)
    process.exit(1)
  }
}
export default createModelApiRouteV4
