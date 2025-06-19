// store/api/projectsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { projectData } from '@/types/common';

const BASE_URL = import.meta.env.VITE_API_URL;

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
   fetchProjects: builder.query<projectData[], { userId: number | undefined }>({
  query: () => `/project/get-projects`, 
  transformResponse: (response: { data: projectData[] }) => response.data,

  serializeQueryArgs: ({ queryArgs }) => {
    // use only userId as cache key
    return { userId: queryArgs.userId };
  },

  providesTags: ['Projects'],
}),

    createProject: builder.mutation<projectData, { title: string; description: string }>({
      query: (newProject) => ({
        url: '/project/create-project',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Projects'],
    }),

    deleteProject: builder.mutation<number, number>({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
