import "../sass/components/header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav id="navbarParent">
      <ul className="navbar">
        {/*LIST ONE*/}
        <li className="navbar__item">
          <Link to="/" className="navbar__item__title">
            Home
          </Link>
        </li>
        {/*List Two*/}
        <li className="navbar__item">
          <Link to="/Login" className="navbar__item__link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
