
import { FaKey } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "@/BackendApi/apiService";

type PasswordFormData = {
    password: string;
    confirmPassword: string;
    oldPassword: string;  
  }
export default function PasswordUpdate() {

    const [error, setError] = useState("");
  

       const { 
              register, 
              watch,
              reset,
              handleSubmit, 
            formState: { errors }, 
            } = useForm<PasswordFormData>({ 
              defaultValues: {
                password:"",
                confirmPassword:"",
                oldPassword:""
              }
            });

            const password = watch("password");

  const handleUpdatePassword = async (PasswordData:PasswordFormData) => {


    const { password, confirmPassword, oldPassword } = PasswordData;
    setError("");
  
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

    try {
      const res = await updatePassword({
        fieldToUpdate: { password, oldPassword },
      });

      if (res.acknowledged === false) {
        setError(res.error);
      } else {
       reset(); // Reset form fields after successful update
       
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Something went wrong while updating password");
    }
  };

            return (
                <form onSubmit={handleSubmit(handleUpdatePassword)}>
             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div>
              <label className="text-gray-600">Old Password</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded-lg"
                {...register("oldPassword", { 
                    required: "Password is required", 
                  })} 
                />
                {errors.oldPassword && (
                  <p className="text-sm text-red-600">{errors.oldPassword.message}</p>
                )}  
            </div>
            <div>
              <label className="text-gray-600">New Password</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded-lg"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message: "Password must contain uppercase, lowercase, number, and special character"
                    }
                  })} 
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}  
            </div>
            <div>
              <label className="text-gray-600">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded-lg"
                {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                  })} 
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}  
            </div>
           
  
            <div className="flex justify-center mt-4">
              <button type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                <FaKey className="text-lg" /> Update Password
              </button>
            </div>
            </form>
);


}