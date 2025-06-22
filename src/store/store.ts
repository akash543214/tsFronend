import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
//import projectsReducer from './projectSlice';
import { projectsApi } from './api/projectsApi';
import {tasksApi} from './api/tasksApi';

export const store = configureStore({
    reducer: {
        auth : authSlice,
      [projectsApi.reducerPath]: projectsApi.reducer,
       [tasksApi.reducerPath]: tasksApi.reducer,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware, tasksApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
