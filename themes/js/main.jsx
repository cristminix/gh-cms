import React from "react"
import ReactDOM from "react-dom/client"

import "@public/styles/tailwind.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "fontawesome-4.7/css/font-awesome.min.css"

import { RouterProvider } from "react-router-dom"

import router from "./router"
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
