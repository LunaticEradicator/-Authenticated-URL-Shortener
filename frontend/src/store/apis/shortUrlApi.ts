import { SHORT_URL } from "../constants";
import parentApi from "./parentApi";

const userApi = parentApi.injectEndpoints({
  endpoints: (builder) => ({
    createShorterUrl: builder.mutation({
      query: (data) => ({
        url: SHORT_URL,
        method: "POST",
        body: data,
      }),
    }),
    getShorterUrl: builder.query<any, void>({
      query: () => ({
        url: SHORT_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateShorterUrlMutation, useGetShorterUrlQuery } = userApi;
