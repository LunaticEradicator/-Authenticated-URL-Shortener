import "../sass/screen/login.scss";
import Container from "../components/Reusable/Container";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // For User Input
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }
  // console.log(formData);

  // For Submitting the User Input
  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <Container>
      <div className="login">
        <h2 className="login__header">Login Credentials</h2>
        {/* HTML FORM */}
        <form
          action="#"
          className="login__form"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <div className="login__form__email">
            <label htmlFor="email">Enter Email</label>
            <input
              required={true}
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
              required={true}
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
          <Link to="/register"> Register</Link>
        </span>
      </div>
    </Container>
  );
}
