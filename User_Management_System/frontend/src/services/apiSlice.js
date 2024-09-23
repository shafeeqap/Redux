import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { adminLogout } from "../features/admin/adminSlice"

const baseQuery = fetchBaseQuery({ 
  baseUrl: "", 
  credentials: "include",
  prepareHeaders: (headers, { getState }) =>{
    const state = getState();

    const userToken = state.auth.userInfo?.token;
    const adminToken = state.admin.adminInfo?.token;

    if(userToken){
      headers.set("Authorization", `Bearer ${userToken}`);
    } else if(adminToken){
      headers.set("Authorization", `Bearer ${adminToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async(args, api, extraOptions) =>{

  let result = await baseQuery(args, api, extraOptions);

  if(result.error && result.error.status === 401){
    const state = api.getState();

    const userToken = state.auth.userInfo?.token;
    const adminToken = state.admin.adminInfo?.token;

    if(userToken){
      api.dispatch(logout());
      result.error.tokenExpired = 'user';
    }else if(adminToken){
      api.dispatch(adminLogout());
      result.error.tokenExpired = 'admin';
    }
  }

  return result;
 };

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Admin"],
  endpoints: (builder) => ({}),
});
