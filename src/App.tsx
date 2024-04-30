import { RouterProvider } from "react-router-dom"
import "./styles/_app.scss"
import { router } from "./router"

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
