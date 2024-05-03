import { RouterProvider } from "react-router-dom"
import "./styles/_app.scss"
import { useSession } from "./hooks/useSession";
import { sessionContext } from "./context/sessionContext";
import { router } from "./router";

function App() {
  const session = useSession();

  return (
  <sessionContext.Provider value={{session}}>
    <RouterProvider router={router}/>
  </sessionContext.Provider>
  )
}

export default App
