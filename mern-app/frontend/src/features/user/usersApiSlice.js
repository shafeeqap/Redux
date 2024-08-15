import { apiSlice } from "../../services/apiSlice";
const USERS_URL = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
      })
    }),
    uploadProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profileImage`,
        method: "POST",
        body: data,
      })
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatePassword`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProfileImage: builder.mutation({
      query: () =>({
        url:`${USERS_URL}/profileImage`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useUploadProfileImageMutation,
  useGetUserQuery,
  // useGetProfileImageQuery,
  useDeleteProfileImageMutation,
} = userApiSlice;
