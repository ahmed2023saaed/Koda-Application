import image11 from "/public/images/image11.jpeg";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from './authcontext';
import { useNavigate } from "react-router-dom"
function Login() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [fieldErrors,setFieldErrors] = useState({});
const {login} = useAuth();
const navigate = useNavigate();
const validate = () => {
  const errors = {};
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
};


const handleLogin = async (e) => {
  e.preventDefault();
 if (!validate()) return;
  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      '/api/auth/login',
      {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }
   if (data.user?.role !== "admin") {
  throw new Error("Access denied: admin only");
}
    // localStorage.setItem("token", data.token);
    login(data.token , data.user)
    navigate("/Dashboard")

    console.log("Login successful:", data.user);


  } catch (err) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-indigo-600 text-white p-8 md:p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-bold mb-8">
            Koda Store
          </h2>

          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Manage Your Business
            <br />
            Like a Pro
          </h1>

          <p className="text-indigo-100 mb-8 leading-relaxed">
            Manage your products, orders and customers
            easily from one place.
          </p>

          <div className="space-y-4">
            <p className="bg-white/10 p-3 rounded-lg">
              ✓ Product Management
            </p>

            <p className="bg-white/10 p-3 rounded-lg">
              ✓ Order Tracking
            </p>

            <p className="bg-white/10 p-3 rounded-lg">
              ✓ Customer Insights
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-4 flex flex-col justify-start">
          <div className="flex justify-center mb-6">
            <img
              src={image11}
              alt="Kode Commerce"
              className="w-50 h-50 "
            />
          </div>

          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            Welcome Back!
          </h2>

          <p className="text-gray-500 text-center text-sm mb-5">
            Sign in to your admin account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              {fieldErrors.email &&(<p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>)}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {fieldErrors.password &&(<p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>)}
            </div>
            {error && (<p className="text-red-500 text-sm">{error}</p>)}

            
             <button
  type="submit"
  disabled={loading}
className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"

>
  {loading ? "Signing in..." : "Sign In"}
</button>
           
          </form>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-400 text-center mt-5">
            Secure Admin Access
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;