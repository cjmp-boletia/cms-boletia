import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        roles: [],
        expiresIn: 0,
        idToken: null,
        refreshToken: null,
        tokenType: null,
    },
    reducers: {
        setCredentials: (
            state,
            {
                payload: {
                    user,
                    token,
                    roles,
                    expiresIn,
                    idToken,
                    refreshToken,
                    tokenType,
                },
            },
        ) => ({
            user,
            token,
            roles,
            expiresIn,
            idToken,
            refreshToken,
            tokenType,
        }),
    },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user || JSON.parse(localStorage.getItem('blt-auth')).user;