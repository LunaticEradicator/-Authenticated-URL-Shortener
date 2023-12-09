import "../sass/screen/register.scss";
import Container from "../components/Reusable/Container";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/apis/userApi";
import { RootState } from "../store/store";
import { registerCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch(); // for userApi slice [action.payload]
  const navigate = useNavigate(); // to change to a link inside a function

  const [registerApi] = useRegisterMutation(); // userApi []
  const { userInfo } = useSelector((state: RootState) => state.auth); // global state

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //checking if url have 'redirect' in it's address
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/"; /// fixxxxxxxxxxx
  // if userInfo has value it means we are logged in
  // if so navigate to the current redirect
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    console.log(redirect);
  }, [userInfo, redirect, navigate]);

  // Frontend Confirm Password validation [using onKeyUp]
  function validatePassword(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(formData.confirmPassword);
    console.log(formData.password);
    console.log(formData.confirmPassword === formData.password);
    formData.confirmPassword !== formData.password
      ? (event.target as HTMLInputElement).setCustomValidity(".error-message")
      : (event.target as HTMLInputElement).setCustomValidity("");
  }

  // For User Input
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }
  // console.log(formData);

  // For Submitting the User Input to the database
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formData.userName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.confirmPassword !== formData.password
    ) {
      // event.target.setCustomValidity(".error-message");
      toast.error("Password must be same");
    } else {
      try {
        const response = await registerApi({
          name: formData.userName,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(registerCredentials({ ...response }));
        // navigate(redirect);
        // console.log(redirect);
        // console.log("FIXXXXXX");
        toast.success("User Registered Successful");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <Container>
      <div className="register">
        <h2 className="register__header">Register User</h2>
        <form
          action="#"
          className="register__form"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <div className="register__form__userName">
            <label htmlFor="userName">Enter Name</label>
            <input
              // required={true}
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="register__form__email">
            <label htmlFor="email">Enter Email</label>
            <input
              // required={true}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(event) => onChangeHandler(event)}
              pattern="^([a-z0-9][._]?)+[a-z0-9]@[a-z0-9]+(\.?[a-z0-9]){2}\.(com?|net|org)+(\.[a-z0-9]{2,4})?"
            />
          </div>
          <div className="register__form__password">
            <label htmlFor="password">Enter Password</label>
            <input
              // required={true}
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="register__form__confirmPassword">
            <label htmlFor="password">Confirm Password</label>
            <input
              // required={true}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onKeyUp={(event) => validatePassword(event)}
              onChange={(event) => onChangeHandler(event)}
            />
            <p className="error-message">Password Does Not Match</p>
          </div>
          <button>Register</button>
          <span>
            Existing User?
            {/* after register if There is redirect go the the redirect page  */}
            {/* else go to /register */}
            <Link
              className="toLoginLink"
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              {" "}
              Login
            </Link>
          </span>
        </form>
      </div>
    </Container>
  );
}
