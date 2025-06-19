import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
//import projectsReducer from './projectSlice';
import { projectsApi } from './api/projectsApi';

export const store = configureStore({
    reducer: {
        auth : authSlice,
      [projectsApi.reducerPath]: projectsApi.reducer,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
