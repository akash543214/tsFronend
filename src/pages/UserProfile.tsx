import { FaUserEdit, FaKey } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../BackendApi/apiService";
import { updateUserData } from "../store/authSlice.ts";
import { updatePassword } from "../BackendApi/apiService";

const UserProfile = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const [password,setPassword] = useState("");
      const [error,setError] = useState("");
      const [confirmPassword,setConfirmPassword] = useState("");
      const [oldPassword,setOldPassword] = useState("");

    const [formData,setFormData] = useState({name:user?.name,email:user?.email});



      const validatePassword = () => {
        if(password==="")
          {
           setError("Please enter a new password");
           return false;
          }
   
          if(oldPassword==="")
          {
           setError("Please enter your old password");
           return false;
          }
          if(oldPassword===password)
          {
           setError("New password cannot be same as old password");
           return false;
          }
          
   if(password.length<6)
   {
     setError("Password must be at least 6 characters long");
     return false;
   }
   if(confirmPassword==="")
   {
     setError("Please confirm your password");
     return false;
   }
   
   if(password!==confirmPassword)
   {
     setError("Passwords do not match");
     return false;
    
    }

    return true;
      }

    const handleUpdatePassword = async()=>{

      setError("");

          if(!validatePassword())
            return;
            
            try {
           const res= await updatePassword({ fieldToUpdate: { password: password,oldPassword: oldPassword } });
              if(res.acknowledged===false)
              {
                setError(res.error);
                console.log(res.error);
              }
              else
              {
                setError("Password updated successfully");
                setPassword("");
                setConfirmPassword("");
                setOldPassword("");
              }
          } catch (error) {
            console.error("Error updating user:", error);
          } finally {
            
          }
    }

    const handleUpdateProfile = async()=>{
      try {
        const res= await updateUser({ fieldToUpdate: { name: formData.name,email:formData.email } });
          if(res.acknowledged===true)
          {
               const newUser = {...user,name:formData.name,email:formData.email};
               dispatch(updateUserData(newUser));
          }

       } catch (error) {
         console.error("Error updating user:", error);
       } 

    }


    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">User Profile</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Name</label>
            <input type="text" value={formData.name} onChange={(e) => handleFormChange({ target: { name: 'name', value: e.target.value } })} className="mt-1 w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-gray-600">Email</label>
            <input type="email" value={formData.email} onChange={(e) => handleFormChange({ target: { name: 'email', value: e.target.value } })} className="mt-1 w-full p-2 border rounded-lg" />
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={handleUpdateProfile} className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <FaUserEdit className="text-lg" /> Update Profile
            </button>
          </div>
          <hr className="my-6 border-gray-300" />
          <div>
            <label className="text-gray-600">Old Password</label>
            <input type="password" value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)} placeholder="Enter new password" className="mt-1 w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-gray-600">New Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter new password" className="mt-1 w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="text-gray-600">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="mt-1 w-full p-2 border rounded-lg" />
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={handleUpdatePassword} className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl">
              <FaKey className="text-lg" /> Update Password
            </button>
          </div>
          <div>
            <label className="text-gray-600">Account Created</label>
            <input type="text" defaultValue={user?.createdAt.slice(0,10)} disabled className="mt-1 w-full p-2 border rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;