import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { RootState } from "../store/store"; 
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, updatePassword } from "../BackendApi/apiService";
import { updateUserData } from "../store/authSlice";
import { AppDispatch } from "../store/store"; // Import AppDispatch if available
import { UserData } from "../types/common";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";


type FormData = {
  name: string;
  email: string;
  password: string;
  oldpassword:string;
 
}

 // Adjust the import path as necessary
export default function UserProfile() {


  const [editing, setEditing] = useState(false)


  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.userData);

      const [error, setError] = useState("");

       const { 
          register, 
          handleSubmit, 
          formState: { errors }, 
        } = useForm<FormData>({ 
          defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            oldpassword: "", 
          }
        });
      
        // Watch password field for confirmation validation
      //  const password = watch("password");

  const handleSave = (data:FormData) => {
   // setUser(formData)
   const {name,email,password,oldpassword} = data;

    if (password && oldpassword) {
      handleUpdatePassword(password,oldpassword);
    }
    if (name && email) {
      handleUpdateProfile(name,email);
    }
    setEditing(false);
    
  }


  const handleUpdatePassword = async (password:string,oldPassword:string) => {
    setError("");
   
    try {
      const res = await updatePassword({
        fieldToUpdate: { password, oldPassword },
      });

      if (res.acknowledged === false) {
        setError(res.error);
      } else {
        setError("Password updated successfully");
       
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Something went wrong while updating password");
    }
  };

  const handleUpdateProfile = async (name:string,email:string) => {
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
          _id: user?._id || "", // Ensure _id is always a string
          name: name,
          email: email,
          googleId: user?.googleId || "", // Ensure googleId is always a string
          provider: user?.provider || "local", // Ensure provider is always "google" or "local"
          createdAt: user?.createdAt || new Date(), // Ensure createdAt is always a Date
          updatedAt: user?.updatedAt || new Date(), // Ensure updatedAt is always a Date
          __v: user?.__v || 0, // Ensure __v is always a number
        };
        dispatch(updateUserData(newUser));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating profile");
    }
  };

  return (
    <div className="w-full mx-auto py-12 px-4 lg:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User Profile</CardTitle>
        </CardHeader>
        {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
        <CardContent className="grid gap-6">
         {/* User Avatar Component */}
          <Separator />
  
        <form onSubmit={handleSubmit(handleSave)}>

          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              disabled={!editing}
                      
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

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={!editing}
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

          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={!editing}
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

          <div className="grid gap-3">
            <Label htmlFor="password">Old Password</Label>
            <Input
              id="password"
              type="password"
              disabled={!editing}
              {...register("oldpassword", { 
                required: "Password is required", 
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })} 
            />
            {errors.oldpassword && (
              <p className="text-sm text-red-600">{errors.oldpassword.message}</p>
            )}  
          </div>

                


          <div className="grid gap-3">
            <Label>Account Created</Label>
            <Input
             value={user?.createdAt ? format(user.createdAt, "PPpp") : ""}

              disabled
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {editing && ( 
              <>
                <Button type="submit">Save</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    //setFormData(user)
                    setEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </>
            
            )}
          </div>
        
          </form>
          {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
        </CardContent>
      </Card>
    </div>
  )
}

