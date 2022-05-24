import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { eventApi } from './api/event.api';
import { manageFilesBase64 } from './api/upload-file-base64.api';
import authReducer from './slices/auth.slice';
export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
        [manageFilesBase64.reducerPath]: manageFilesBase64.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            eventApi.middleware,
            manageFilesBase64.middleware
        ),
});