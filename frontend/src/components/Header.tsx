import "../sass/components/header.scss";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
export default function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth); // global state

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
          {userInfo ? (
            <Link to="#" className="navbar__item__link">
              Logout
              <sup>{` ${userInfo.name}`}</sup>
            </Link>
          ) : (
            <Link to="/Login" className="navbar__item__link">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
