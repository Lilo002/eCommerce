import { Link } from "react-router-dom"

export const Main = () => {
  return <div>
    <h1>Main page</h1>
    <button>
      <Link to='/login'>to login</Link>
    </button>
    <button>
      <Link to='/registration'>to Registration</Link>
    </button>
  </div>
}