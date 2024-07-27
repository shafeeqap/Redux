import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['User'],
    endpoints: () =>({})
});