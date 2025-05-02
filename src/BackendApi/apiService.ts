// apiService.js
const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const addTask = async (Task: { content: string; 
  priority: string; 
  deadline: string; 
  isComplete: string; }) => {

const {content,priority,deadline,isComplete} = Task;
  
  try {
    const response = await fetch(`${BASE_URL}/addtask`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content,priority,deadline,isComplete }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const editTask = async (updateObj: { id: string; 
  fieldToUpdate: any; }) => {
  const { id, fieldToUpdate } = updateObj;

  if (!id || !fieldToUpdate) {
    console.error("Invalid update object:", updateObj);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/updatetask?id=${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldToUpdate || {}),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const getTasks = async () => {
  
  try {
    const response = await fetch(`${BASE_URL}/get-tasks`,{
      credentials: "include"
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};
export const deleteTask = async (id:string) => {
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
};

export const createUser = async (User: { name: string; email: string; password: string; }) => {

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
};

export const deleteUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/remove`, {
      method: "DELETE",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};


export const loginUser = async(User: { email: string;
   password: string; })=>{

  const {email,password} = User;
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email,password }),
    });
   
  return await response.json();
   
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }

}

export const verifyUserlogin = async()=>{

  try {
    const response = await fetch(`${BASE_URL}/verify-login`, {
      method: "POST",
      credentials: "include",
    });
   
  return await response.json();
   
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }

}
export const logoutUser = async()=>{

  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}


export const updateUser = async (updateObj: { fieldToUpdate: any; }) => {
  const { fieldToUpdate } = updateObj;

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
