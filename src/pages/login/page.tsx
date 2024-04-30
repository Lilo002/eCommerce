import { Link } from "react-router-dom"

export const LoginPage = () => {
  return <div>
    <h1>Login page</h1>
    <button>
      <Link to='/'>to main</Link>
    </button>
    <button>
      <Link to='/registration'>to Registration</Link>
    </button>
  </div>
}