import { Link } from "react-router-dom"

export const RegistrationPage = () => {
  return <div>
    <h1>Registration page</h1>
    <button>
      <Link to='/'>to main</Link>
    </button>
    <button>
      <Link to='/login'>to login</Link>
    </button>
  </div>
}