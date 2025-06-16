import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { loginUser, googleAuth } from "../../BackendApi/apiService";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { Loader2Icon, AlertCircle } from "lucide-react";
import { createUser } from "../../BackendApi/apiService";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SigninFormProps = {
  setSelectedForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function SigninForm({ setSelectedForm, className, ...props }: SigninFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch();
        
  const { 
    register, 
    handleSubmit, 
    watch,
    reset, 
    formState: { errors }, 
  } = useForm<RegisterFormData>({ 
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Watch password field for confirmation validation
  const password = watch("password");

  const handleSignin = async (data: RegisterFormData) => {
    setError("");
    setLoading(true);
    
    const { name, email, password, confirmPassword } = data;

    // Client-side password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await createUser({ name, email, password });
      
      // Check if user creation was successful
      if (response.error) {
        setError(response.error);
        return;
      }
      
      // Auto-login after successful registration
      const loginResponse = await loginUser({ email, password });
      console.log(loginResponse);
      if (!loginResponse.success) {
        setError(loginResponse.error || "Login failed after registration");
      } else {
        dispatch(login(loginResponse.user));
        // Reset form on success
        reset();
      }
    } catch (error: any) {
      console.error("Error registering user:", error);
      setError(error.message || "An unexpected error occurred");
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    
    try {
      const response = await googleAuth();
      if (response.login === false) {
        setError(response.error || "Google authentication failed");
      } else {
        dispatch(login(response.user));
      }
    } catch (error: any) {
      console.error("Error with Google login:", error);
      setError(error.message || "Google authentication failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>
            Sign up with your Google account or email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Google Sign In Button */}
            <Button 
              type="button"
              onClick={handleGoogleLogin} 
              variant="outline" 
              className="w-full"
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {googleLoading ? "Signing in..." : "Sign up with Google"}
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(handleSignin)} className="grid gap-4">
              {/* Full Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
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

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input  
                  id="password"
                  type="password"
                  placeholder="Enter your password"
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

              {/* Confirm Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input  
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                  })} 
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}  
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => setSelectedForm("login")} 
                className="underline underline-offset-4 hover:text-primary"
                disabled={loading || googleLoading}
              >
                Sign in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="text-center text-xs text-balance text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>.
      </div>
    </div>
  )
}