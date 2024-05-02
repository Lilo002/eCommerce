import './_header.scss';
import { Link } from "react-router-dom"
import { ROUTES } from "../../shared/constants";

export const Header = () => {
  return <header className="header">
    <div>
      <Link to={ROUTES.MAIN}>LOGO</Link>
    </div>
    <nav className="header-menu-list">
      <Link to={ROUTES.MAIN}>Main</Link>      
      <Link to={ROUTES.CATALOG}>Catalog</Link>      
      <Link to={ROUTES.ABOUT}>About Us</Link>      
    </nav>
    <div className="header-menu-btn">
      <button>
        <Link to={ROUTES.LOGIN}>Log In</Link>
      </button>
      <button>
        <Link to={ROUTES.REGISTRATION}>Registration</Link>
      </button>
    </div>
  </header>
}