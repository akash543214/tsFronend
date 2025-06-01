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
import { User } from "lucide-react";
import { RootState } from "../store/store"; 
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, updatePassword } from "../BackendApi/apiService";
import { updateUserData } from "../store/authSlice";
import { AppDispatch } from "../store/store"; // Import AppDispatch if available
import { user } from "../types/common";
import { useForm } from "react-hook-form";


type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  oldpassword:string;
  confirmPassword: string;
}

 // Adjust the import path as necessary
export default function UserProfile() {


  const [editing, setEditing] = useState(false)


  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.userData);

      const [error, setError] = useState("");

  const handleSave = () => {
   // setUser(formData)
    setEditing(false)
    
  }


  const handleUpdatePassword = async () => {
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

  const handleUpdateProfile = async () => {
    try {
      const res = await updateUser({
        fieldToUpdate: {
          name: formData.name,
          email: formData.email,
        },
      });

      if (res.acknowledged) {
        const newUser: user = {
          ...user,
          name: formData.name,
          email: formData.email,
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
        <CardContent className="grid gap-6">
         {/* User Avatar Component */}
          <Separator />

          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              disabled={!editing}
                      
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              disabled={!editing}
                        
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              disabled={!editing}
                      
            />
          </div>

          <div className="grid gap-3">
            <Label>Account Created</Label>
            <Input
             value={user?.createdAt ? format(user.createdAt, "PPpp") : ""}

              disabled
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {editing ? (
              <>
                <Button onClick={handleSave}>Save</Button>
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
            ) : (
              <Button onClick={() => setEditing(true)}>Edit</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

