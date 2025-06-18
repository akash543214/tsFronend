import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import projectsReducer from './projectSlice';

export const store = configureStore({
    reducer: {
        auth : authSlice,
      projects: projectsReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
