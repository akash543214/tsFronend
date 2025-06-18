// store/projectsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// apiService.js
const BASE_URL = import.meta.env.VITE_API_URL;
//import { Task } from "@/types/common";
import axios from 'axios';

// Configure axios instance with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});import { projectData } from '@/types/common';

interface ProjectsState {
  items: projectData[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  const res = await axiosInstance.get('/project/get-projects');
  return res.data.data; // Project[]
});

export const createProject = createAsyncThunk(
  'projects/create',
  async (project: { title: string; description: string }) => {
    const res = await axios.post('/projects/create-project', project);
    return res.data.data; // New Project
  }
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (projectId: number) => {
    await axios.delete(`/api/project/${projectId}`);
    return projectId;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch projects';
      })

            // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

     .addCase(createProject.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to create project';
  })
      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })

      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete project';
      });
  },
});

export default projectsSlice.reducer;
