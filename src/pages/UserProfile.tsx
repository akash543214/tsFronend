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

interface UserData {
  _id: string;
  name: string;
  email: string;
  googleId: string;
  provider: "google" | "local";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function UserProfile() {


  const [editing, setEditing] = useState(false)

  const handleSave = () => {
   // setUser(formData)
    setEditing(false)
  }

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

