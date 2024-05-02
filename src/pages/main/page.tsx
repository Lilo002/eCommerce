import { Link } from "react-router-dom"
import { Header } from "../../components/header/header"

export const Main = () => {
  return <div>
    <Header />
    <h1>Main page</h1>
    <button>
      <Link to='/login'>to login</Link>
    </button>
    <button>
      <Link to='/registration'>to Registration</Link>
    </button>
  </div>
}