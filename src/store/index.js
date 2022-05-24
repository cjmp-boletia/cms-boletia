import { configureStore } from '@reduxjs/toolkit';
import { eventApi } from './api/event.api';
import { manageFilesBase64 } from './api/upload-file-base64.api';

export default configureStore({
    reducer: {
        event: {},
        [eventApi.reducerPath]: eventApi.reducer,
        [manageFilesBase64.reducerPath]: manageFilesBase64.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            eventApi.middleware,
            manageFilesBase64.middleware
        ),
});