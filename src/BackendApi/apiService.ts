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
  withCredentials: true, // equivalent to credentials: "include"
});

export const addTask = async (task: any,projectId:number) => {

  
  try {
    const response = await axiosInstance.post(`/task/create-task/${projectId}`, task);
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get('/project/get-projects');
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
};


export const updateTask = async (updateObj: { taskId: number; 
  fieldToUpdate: any; }) => {

      const { taskId, fieldToUpdate } = updateObj;
       console.log(fieldToUpdate);
       console.log(typeof taskId);
  try {
    const response = await axiosInstance.patch(`/task/update-task/${taskId}`,fieldToUpdate);
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getTasks = async (projectId:number) => {

   try {
    const response = await axiosInstance.get(`/task/tasks-with-allsubtasks/${projectId}`);
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
};


export const deleteTask = async (id:number) => {

  /*
  try {
    const response = await fetch(`${BASE_URL}/removetask?id=${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
    */
};

export const createUser = async (User: { name: string; email: string; password: string; }) => {
/*
  const {name,email,password} = User;
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email,password }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
    */
};

export const deleteUser = async () => {

  /*
  try {
    const response = await fetch(`${BASE_URL}/remove`, {
      method: "DELETE",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
    */
};


export const loginUser = async(User: { email: string;
   password: string; })=>{

 try {
    const response = await axiosInstance.post('/login-user', User);
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
}

export const verifyUserlogin = async()=>{

try {
    const response = await axiosInstance.post('/verify-login');
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
}

export const logoutUser = async()=>{

   try {
    const response = await axiosInstance.post('/logout-user');
    return response.data; // axios automatically parses JSON
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || `HTTP error! Status: ${error.response?.status}`;
      console.error("Error adding task:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Error adding task:", error);
    throw error;
  }
}


export const updateUser = async (updateObj: { fieldToUpdate: any; }) => {
 // const { fieldToUpdate } = updateObj;
/*
  if (!fieldToUpdate) {
    console.error("Invalid update object:", updateObj);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/update-user`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldToUpdate || {}),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
    */
};

export const updatePassword = async (updateObj: { fieldToUpdate: any; }) => {
  const { fieldToUpdate } = updateObj;

  if (!fieldToUpdate) {
    console.error("Invalid update object:", updateObj);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/update-password`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldToUpdate || {}),
    });
      return await response.json();
     
   
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

export const googleAuth = async()=>{
  
  window.location.href = `${BASE_URL}/google`;

}

