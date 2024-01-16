import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom"
import Root from './routes/root.tsx'
import Dogs from './routes/dogs.tsx'
import Colors from './routes/colors.tsx'
import DogPage from './routes/dogPage.tsx'
import ColorPage from './routes/colorPage.tsx'
import NewColorPage from './routes/newColorPage.tsx'

export type DogType = {
  name: string,
  age: number,
  src: string,
  facts: string[]
}

export const dogsInfo = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: "whiskey",
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: "duke",
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: "perry",
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: "tubby",
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/dogs",
        element: <Dogs/>,
        children: [
          {
            path: "/dogs/:source",
            element: <DogPage />
          }
        ]
      },
      {
        path: "/colors",
        element: <Colors/>,
        children: [
          {
            path: "/colors/new",
            element: <NewColorPage />
          },
          {
            path: "/colors/:color",
            element: <ColorPage/>
          },
        ]
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/"/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='centerify'>
      <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)
