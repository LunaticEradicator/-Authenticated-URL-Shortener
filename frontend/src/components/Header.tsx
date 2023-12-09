import "../sass/components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../store/apis/userApi";
import { logoutCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth); // global state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutCredentials());
      navigate("/login");
      toast.success("Logout Successful");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

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
            <Link onClick={handleLogout} to="#" className="navbar__item__link">
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
