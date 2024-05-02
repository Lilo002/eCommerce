import { Link } from "react-router-dom"
import './_header.scss';

export const Header = () => {
  return <nav className="header">
    <div>
      <Link to="/">LOGO</Link>
    </div>
    <ul className="header-menu-list">
      <li>
        <Link to="/">Main</Link>      
      </li>
      <li>
        <Link to="/catalog">Catalog</Link>      
      </li>
      <li>
        <Link to="/about">About Us</Link>      
      </li>
    </ul>
    <div className="header-menu-btn">
      <button>
        <Link to='/login'>Log In</Link>
      </button>
      <button>
        <Link to='/registration'>Registration</Link>
      </button>
    </div>
  </nav>
}