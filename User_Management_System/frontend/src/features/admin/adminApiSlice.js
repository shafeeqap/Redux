import { apiSlice } from "../../services/apiSlice";
const ADMIN_URL = "api/admin";

const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credential) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: credential,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    addNewUser: builder.mutation({
      query: (data) =>({
        url: `${ADMIN_URL}/add-user`,
        method: "POST",
        body: data
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/${userId}`,
        method: "DELETE",
        body: userId,
      }),
    }),
    blockUnblockUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/block-unblock${userId}`,
        method: "PATCH",
        body: userId,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAddNewUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = adminApiSlice;
