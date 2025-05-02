import { useState } from "react";
import { loginUser, googleAuth } from "../BackendApi/apiService";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import LoadingBtn from "./Assets/Loadingbtn";

// Fix the props type: it should be an object with `setLoginModal` as a prop
interface LoginProps {
  setLoginModal: (open: boolean) => void;
}
export interface LoginResponse {
  login: boolean;
  user?: any; // Replace `any` with your actual user type
  error?: string;
}

export default function Login({ setLoginModal }: LoginProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      if (response.login === false) {
        setError(response.error || "");
      } else {
        dispatch(login(response.user));
        resetForm();
        setLoginModal(false);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleGoogleLogin = async() => {
    try {
      const response = await googleAuth();
      if (response.login === false) {
        setError(response.error || "");
      } else {
        dispatch(login(response.user));
        resetForm();
        setLoginModal(false);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            Login to your account
          </h2>

          <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                {!loading ? (
                  <button
                    onClick={handleLogin}
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Login
                  </button>
                ) : (
                  <LoadingBtn />
                )}
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                  </svg>
                </span>
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
