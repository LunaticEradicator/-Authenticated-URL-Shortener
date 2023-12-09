import "../sass/screen/UrlShorter.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  useCreateShorterUrlMutation,
  useGetShorterUrlQuery,
} from "../store/apis/shortUrlApi";
import { toast } from "react-toastify";

import Loader from "../components/Reusable/Loader";

interface postProps {
  _id: string;
  longUrl: string;
  shortUrl: string;
}

export default function UrlShorter() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const {
    data: shortUrlData,
    isLoading,
    isError,
    refetch,
  } = useGetShorterUrlQuery();

  const [shortApi] = useCreateShorterUrlMutation();
  const [formData, setFormData] = useState({
    urlShorter: "",
  });
  // console.log(formData);

  //checking if url have 'redirect' in it's address
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  // if userInfo has value it means we are logged in
  // if so navigate to the current redirect
  useEffect(() => {
    if (userInfo) {
      // refetch(); // fetch the corresponding logged in user's shortUrl
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // only if userInfo [ jwt token] is available
    if (!userInfo) {
      redirect ? navigate(`/login?redirect=${redirect}`) : navigate("/login");
    } else {
      try {
        await shortApi({ longUrl: formData.urlShorter }).unwrap(); // creating new shortUrl
        toast.success("ShortUrl Successfully Created");
        formData.urlShorter = "";
        refetch(); // refetch api after creating a new shorterUrl
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  let renderShortUrlData;
  if (isLoading) {
    renderShortUrlData = <Loader />;
  } else if (isError) {
    renderShortUrlData = <div>Error Loading Page</div>;
  } else {
    renderShortUrlData = (
      <table>
        <caption>Short URL</caption>
        <thead>
          <tr>
            <th>Shorten URL</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {shortUrlData?.map((data: postProps) => {
            return (
              <tr key={data._id}>
                <td data-label="URL">
                  {" "}
                  <Link target="_blank" className="longUrl" to={data.longUrl}>
                    {data.longUrl}
                  </Link>
                </td>
                <td data-label="Shorten URL">
                  {" "}
                  <Link target="_blank" className="shortUrl" to={data.longUrl}>
                    {`www.${data.shortUrl}.com`}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    shortUrlData.map((data: postProps) => {
      return (
        <div style={{ border: "1px solid red" }}>
          <div>{data.longUrl}</div>
          <Link to={data.longUrl}>
            <div>{data.shortUrl}</div>
          </Link>
        </div>
      );
    });
  }
  return (
    <>
      <div className="urlShorter">
        <h2>Shorten a long url</h2>
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
            <button className="urlShorter__btn">Shorten</button>
          </div>
        </form>
      </div>
      {userInfo && renderShortUrlData}
    </>
  );
}
