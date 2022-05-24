import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_AUTH,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'sign-in',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response, meta, arg) => ({
                user: response.User,
                token: response.Access.AuthenticationResult.AccessToken,
                roles: [],
                expiresIn: response.Access.AuthenticationResult.ExpiresIn,
                idToken: response.Access.AuthenticationResult.IdToken,
                refreshToken: response.Access.AuthenticationResult.RefreshToken,
                tokenType: response.Access.AuthenticationResult.TokenType,
            }),
        })
    }),
});

export const {
    useLoginMutation
} = authApi;