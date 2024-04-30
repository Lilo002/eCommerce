import { RouterProvider } from "react-router-dom"
import "./styles/_app.scss"
import { router } from "./router"

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
