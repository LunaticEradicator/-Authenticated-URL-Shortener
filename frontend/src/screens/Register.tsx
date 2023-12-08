import "../sass/screen/register.scss";
import Container from "../components/Reusable/Container";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
              required={true}
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
              required={true}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="register__form__password">
            <label htmlFor="password">Enter Password</label>
            <input
              required={true}
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="register__form__confirmPassword">
            <label htmlFor="password">Enter Password</label>
            <input
              required={true}
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <button>Login</button>
          <span>
            Existing User?
            <Link to="/"> Login</Link>
          </span>
        </form>
      </div>
    </Container>
  );
}
