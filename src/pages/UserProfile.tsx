
import { format } from "date-fns";
import ProfileUpdate from "@/components/User/ProfileUpdate";
import PasswordUpdate from "@/components/User/PasswordUpdate";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const UserProfile = () => {

  const user = useSelector((state: RootState) => state.auth.userData);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white shadow-xl rounded-2xl p-6 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          {user?.name}
        </h2>

        <div className="space-y-4">
          <ProfileUpdate />
          <hr className="my-6 border-gray-300" />
          <PasswordUpdate />
          <div>
            <label className="text-gray-600">Account Created</label>
            <input
              type="text"
              value={user?.created_at ? format(user.created_at, "PPpp") : ""}
              disabled
              className="mt-1 w-full p-2 border rounded-lg bg-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
