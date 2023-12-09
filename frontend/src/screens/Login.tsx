import "../sass/screen/login.scss";
import Container from "../components/Reusable/Container";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/apis/userApi";
import { RootState } from "../store/store"; // typescript fix
import { loginCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch(); // for userApi slice [action.payload]
  const navigate = useNavigate(); // to change to a link inside a function

  const [loginApi] = useLoginMutation(); // userApi []
  const { userInfo } = useSelector((state: RootState) => state.auth); // global state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //checking if url have 'redirect' in it's address
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  // if userInfo has value it means we are logged in
  // if so navigate to the current redirect
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  // console.log(redirect);

  // For User Input
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }
  // console.log(formData);

  // For Submitting the User Input
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginApi({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(loginCredentials({ ...response }));
      // navigate(redirect);
      toast.success("User Login Successful");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Container>
      <div className="login">
        <h2 className="login__header">Login User</h2>
        {/* HTML FORM */}
        <form
          action="#"
          className="login__form"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <div className="login__form__email">
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="login__form__password">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
          <button>Login</button>
        </form>
        <span>
          New User?
          {/* after login if There is redirect go the the redirect page  */}
          {/* else go to /register */}
          <Link
            className="toRegisterLink"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            {" "}
            Register
          </Link>
        </span>
      </div>
    </Container>
  );
}
