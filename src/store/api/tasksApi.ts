
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '@/types/common';
const BASE_URL = import.meta.env.VITE_API_URL;

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({  baseUrl: BASE_URL,
    credentials: 'include', }),
  tagTypes: ['Task'],

  endpoints: (builder) => ({
    getTasks: builder.query<Task[] , number>({

      query: (projectId) => `task/tasks-with-allsubtasks/${projectId}`,
         transformResponse: (response: { data: Task[] }) => response.data,
      
      providesTags: ['Task'],
    }),

    createTask: builder.mutation<Task, { taskData: Partial<Task>; projectId: number }>({
      query: ({ taskData, projectId }) => ({
        url: `/task/create-task/${projectId}`, 
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task'],
    }),
    
    updateTask: builder.mutation<Task, { taskId: number; fieldToUpdate: Record<string, any> }>({
      query: ({ taskId, fieldToUpdate }) => ({
        url: `/task/update-task/${taskId}`,
        method: 'PATCH',
        body: fieldToUpdate,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation<void, number>({
      query: (taskId) => ({
        url: `/task/delete-task/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
