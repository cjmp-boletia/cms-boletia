import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_EVENT
    }),
    keepUnusedDataFor: 3600,
    endpoints: (build) => ({
        getEvents: build.query({
            query: () => 'events',
            providesTags: (result, error, id) => [{ type: 'Events', id }],
            transformResponse: (response, meta, arg) => response.body.events,
        }),
        addEvent: build.mutation({
            query: (body) => ({
                url: 'events',
                method: 'POST',
                body
            }),
            transformResponse: (response, meta, arg) => response,
        }),
        getEvent: build.query({
            query: (id) => ({
                url: `events/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Events', id }],
            transformResponse: (response, meta, arg) => response.body,
        }),
        updateEvent: build.mutation({
            query: (body) => ({
                url: `events/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Events', id }],
            transformResponse: (response, meta, arg) => response.body,
        }),
        deleteEvent: build.mutation({
            query: (body) => ({
                url: `events/${body}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Events', id }],
            transformResponse: (response, meta, arg) => response.body,
        }),
    }),
});

export const {
    useGetEventsQuery,
    useGetEventQuery,
    useAddEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation
} = eventApi;