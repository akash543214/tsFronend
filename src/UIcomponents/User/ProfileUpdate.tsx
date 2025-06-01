
import { FaUserEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { UserData } from "@/types/common";
import { AppDispatch } from "@/store/store";
import { updateUserData } from "@/store/authSlice";
import { updateUser } from "@/BackendApi/apiService";
import { RootState } from "@/store/store";
import { useForm } from "react-hook-form";

type profileFormData = {  
    name: string;
    email: string;
  };
  
export default function ProfileUpdate()
{

     const [error, setError] = useState("");
      const dispatch = useDispatch<AppDispatch>();
      const user = useSelector((state: RootState) => state.auth.userData);

       const { 
          register, 
          handleSubmit, 
        formState: { errors }, 
        } = useForm<profileFormData>({ 
          defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
          }
        });
        
  const handleUpdateProfile = async (profileData:profileFormData) => {

    const { name, email } = profileData;
    try {
      const res = await updateUser({
        fieldToUpdate: {
          name: name,
          email: email,
        },
      });

      if (res.acknowledged) {
        const newUser: UserData = {
          ...user,
          name: name,
          email:email,
        };
        dispatch(updateUserData(newUser));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating profile");
    }
  };

    return (
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div>
          <label className="text-gray-600">Name</label>
          <input
            type="text"              
            className="mt-1 w-full p-2 border rounded-lg"
            {...register("name", { 
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })} 
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}  
        </div>
        <div>
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            className="mt-1 w-full p-2 border rounded-lg"
              {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })} 
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}  
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            <FaUserEdit className="text-lg" /> Update Profile
          </button>
        </div>
        </form>
    );
}