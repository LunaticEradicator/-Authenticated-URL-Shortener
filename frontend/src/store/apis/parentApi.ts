import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const parentApi = createApi({
  reducerPath: "parent",
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default parentApi;
