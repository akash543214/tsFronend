import { useState } from "react";
import { createUser } from "../BackendApi/apiService";
import { loginUser } from "../BackendApi/apiService";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import LoadingBtn from "./Assets/Loadingbtn";

export default function Signin(_props)
{
  const [formData, setFormData] = useState({ name: "", email: "", password: "",confirmPassword:"" }); // Form Data object
  const [error, setError] = useState("");
const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();


      // Function to handle Signup
     const handleSignup = async () => {


      const { name, email, password,confirmPassword } = formData;
      if (!name || !email || !password || !confirmPassword) {
        setError("All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError("");

      setLoading(true);
      try {
        const response = await createUser({name,email,password});

        const res = await loginUser({email,password});
            if(res.login===false)
                  setError(response.error);
                else
                {
                 dispatch(login(res.user));
                 
                }

     }
      catch (error) {
        console.error("Error adding user:", error);
      } finally{
        _props.setSignupModal(false);
        resetForm();
        setLoading(false);
      }
    }

    // Function to handle form change
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };


    const resetForm = () => {
     
        setFormData({ name: "", email: "", password: "",confirmPassword:""});
      
    }
     
  
    return (
        <section>
          <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-center text-2xl font-bold leading-tight text-black">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                Sign up to create account
              </h2>
            
            
              <form className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Full Name{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => handleFormChange({ target: { name: 'name', value: e.target.value } })}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        value = {formData.name}
                    
                      ></input>
    
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                      {' '}
                      Email address{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => handleFormChange({ target: { name: 'email', value: e.target.value } })}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        value = {formData.email}
                       
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                           onChange={(e) => handleFormChange({ target: { name: 'password', value: e.target.value } })}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        value = {formData.password}
                       
                      ></input>
    
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Confirm Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                       onChange={(e) => handleFormChange({ target: { name: 'confirmPassword', value: e.target.value } })}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Confirm Password"
                        value = {formData.confirmPassword}
                       
                      ></input>
    
                    </div>
                  </div>
                  <div>
                  { !loading? <button type="button" onClick={handleSignup} className="inline-flex w-full items-center 
                    justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7
                     text-white hover:bg-black/80">
                      Create Account  
                    </button>:<LoadingBtn />}
                  </div>
                </div>
              </form>
            
            </div>
          </div>
        </section>
      )
}