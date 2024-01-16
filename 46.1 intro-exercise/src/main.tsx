import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.tsx'
import Root from './routes/root.tsx'
import Apricot from './routes/apricot.tsx'
import Gasoline from './routes/gasoline.tsx'
import AmazonStock from './routes/amazon-stock.tsx'

const router = createBrowserRouter
  ([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/apricot",
            element: <Apricot />
          },
          {
            path: "/gasoline",
            element: <Gasoline />
          },
          {
            path: "/amazon-stock",
            element: <AmazonStock />
          },
        ]
      }
    ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
