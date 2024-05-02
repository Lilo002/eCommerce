import { Link } from "react-router-dom"
import { ROUTES } from "../../shared/constants"

export const LoginPage = () => {
  return <div>
    <h1>Login page</h1>
    <button>
      <Link to={ROUTES.MAIN}>to main</Link>
    </button>
    <button>
      <Link to={ROUTES.REGISTRATION}>to Registration</Link>
    </button>
  </div>
}