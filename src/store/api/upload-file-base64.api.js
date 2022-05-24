import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const manageFilesBase64 = createApi({
    reducerPath: 'manageFilesBase64',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_UPLOAD_BASE64
    }),
    keepUnusedDataFor: 3600,
    endpoints: (build) => ({
        uploadImageBase64: build.mutation({
            query: (body) => ({
                url: `images`,
                method: 'POST',
                body
            }),
            transformResponse: (response, meta, arg) => response,
        }),
        deleteImage: build.mutation({
            query: (body) => ({
                url: `images/${body.id}/${body.extension}`,
                method: 'DELETE',
                body
            }),
            transformResponse: (response, meta, arg) => response,
        }),
    }),
});

export const {
    useUploadImageBase64Mutation,
    useDeleteImageMutation
} = manageFilesBase64;