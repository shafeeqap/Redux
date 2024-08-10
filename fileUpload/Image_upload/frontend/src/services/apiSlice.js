import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api/file" }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/uploadFile",
        method: "POST",
        body: file,
      }),
    }),
    getFile: builder.query({
      query: (id) => `/getFile/${id}`,
    }),
  }),
});


export const { useUploadFileMutation, useGetFileQuery } = apiSlice;