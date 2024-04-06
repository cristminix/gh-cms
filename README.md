# GH-CMS

Simple NodeJs Content Management System that using Twig template engine that had hmr Feature while editing twig template blocks.

# FEATURE

Coming soon ...

# INSTALL AND RUN PROJECT

Install deendencies

```
npm i
```

Please specify server port on `config/app.json` before running this projects

```
{
  "host": "localhost",
  "bindHost": "0.0.0.0",
  "port": 7700,
  "vitePort": 5000,
  "useHttps": false
  ...
}

```

Run Vite dev server for frontend

```
npx vite
```

Run Express backend dev server

```
npx nodemon api/rest-server.mjs
```

Apply tailwind css on backend dev server

```
npm run tailwind:css
```

Open up `http://localhost:5000/preview/` for public twig hmr update while editing twig template

Open up `http://localhost:7700/` for native template rendering via express server

Open up `http://localhost:5000/cp/` for content management system control panel

![GH-CMS Control Panel](wiki/images/gh-cms-cp.PNG?raw=true "cp")

![GH-CMS Control Panel](wiki/images/ss-page-editor.png?raw=true "Page editor with block feature")

This project is still in progress ....

[![HitCount](https://hits.dwyl.com/cristminix/gh-cms.svg?style=flat)](http://hits.dwyl.com/cristminix/gh-cms)

# DONATE

- Paypal waybeeofficial@gmail.com
- Buy me a coffe https://www.buymeacoffee.com/waybeeofficial
