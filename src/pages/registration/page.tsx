import { Link } from "react-router-dom"
import { ROUTES } from "../../shared/constants"

export const RegistrationPage = () => {
  return <div>
    <h1>Registration page</h1>
    <button>
      <Link to={ROUTES.MAIN}>to main</Link>
    </button>
    <button>
      <Link to={ROUTES.LOGIN}>to login</Link>
    </button>
  </div>
}