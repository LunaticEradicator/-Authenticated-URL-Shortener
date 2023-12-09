import { SHORT_URL } from "../constants";
import parentApi from "./parentApi";

const userApi = parentApi.injectEndpoints({
  endpoints: (builder) => ({
    createShorterUrl: builder.mutation({
      invalidatesTags: ["ShortUrl"],
      query: (data) => ({
        url: SHORT_URL,
        method: "POST",
        body: data,
      }),
    }),
    getShorterUrl: builder.query<any, void>({
      providesTags: ["ShortUrl"],
      keepUnusedDataFor: 1,
      query: () => ({
        url: SHORT_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateShorterUrlMutation, useGetShorterUrlQuery } = userApi;
