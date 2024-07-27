import { apiSlice } from "../../services/apiSlice.js";

const USER_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // user login
    login: builder.mutation({ // mutation hook is used for creating, updating, or deleting data.
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // user register
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // user logout
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // user display
    fetchUser: builder.query({
      query: () => ({
        url: `${USER_URL}/getuser`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useFetchUserQuery,
} = userApiSlice;
