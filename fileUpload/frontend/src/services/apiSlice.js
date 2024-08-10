import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/users" }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    getImage: builder.query({
      query: (id) => `/images/${id}`,
    }),
  }),
});

export const { useUploadImageMutation, useGetImageQuery } = apiSlice;
