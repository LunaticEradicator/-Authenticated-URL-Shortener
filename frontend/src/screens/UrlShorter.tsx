import "../sass/screen/UrlShorter.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export default function UrlShorter() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    urlShorter: "",
  });
  // console.log(formData);

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

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // only if userInfo [ jwt token] is available
    if (!userInfo) {
      redirect ? navigate(`/login?redirect=${redirect}`) : navigate("/login");
    }
    console.log("Clicked");
  }
  return (
    <>
      <div className="urlShorter">
        <h2>Shorten URL</h2>
        <form action="#" className="urlShorter__form" onSubmit={handleSubmit}>
          <div className="urlShorter__form__url">
            <label htmlFor="urlShorter">Enter URL</label>
            <input
              type="text"
              name="urlShorter"
              id="urlShorter"
              onChange={onChangeHandler}
              value={formData.urlShorter}
            />
            <button>Shorten</button>
          </div>
        </form>
      </div>
    </>
  );
}

{
  /* Responsive Table to show Shorten page [Implementation later] */
}
{
  /* <table>
        <caption>Shorten URL Details</caption>
        <thead>
          <tr>
            <th>Shorten URL</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr key={"123"}>
            <td data-label="Shorten URL">Shorten URL</td>
            <td data-label="URL">URL</td>
          </tr>
        </tbody>
      </table> */
}
