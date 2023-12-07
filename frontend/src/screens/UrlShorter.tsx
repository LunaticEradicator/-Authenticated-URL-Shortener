import "../sass/screen/UrlShorter.scss";
import { useState } from "react";

export default function UrlShorter() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Clicked");
  }
  const [formData, setFormData] = useState({
    urlShorter: "",
  });
  console.log(formData);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
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

      <table>
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
      </table>
    </>
  );
}
