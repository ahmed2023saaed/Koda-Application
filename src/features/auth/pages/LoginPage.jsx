import image11 from "/public/images/image11.jpeg";
import { FcGoogle } from "react-icons/fc";
import { ShoppingBag, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from '@/features/auth/contexts/authContext';
import { useNavigate } from "react-router-dom"
import api from "@/api/axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
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
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const data = response.data;

      if (!data.success || !data.token || !data.user) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);

      navigate("/dashboard", { replace: true });

      console.log("Login successful:", data.user);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };



  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch(
  //       '/api/auth/login',
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok || !data.success) {
  //       throw new Error(data.message || "Login failed");
  //     }
  //     // if (data.user?.role !== "admin") {
  //     //   throw new Error("Access denied: admin only");
  //     // }
  //     // localStorage.setItem("token", data.token);
  //     login(data.token, data.user)
  //     navigate("/Dashboard")

  //     console.log("Login successful:", data.user);


  //   } catch (err) {
  //     setError(err.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0a1628] flex p-4 lg:p-8 [color-scheme:dark]">
  <div className="m-auto w-full max-w-md lg:max-w-6xl bg-[#0f1f3a] rounded-3xl border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl shadow-blue-900/40">

        {/* Left Side (hidden on mobile / tablet) */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 shadow-xl shadow-blue-900/30">

          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-9 h-9 text-white" />
            <h2 className="text-3xl font-bold text-white">Koda Commerce</h2>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Manage Your Store
            <br />
            Like a Pro
          </h1>

          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Control products, orders, users, carts and analytics from
            a modern dashboard experience.
          </p>

          <div className="space-y-4">
            <p className="bg-white/15 px-6 py-4 rounded-2xl text-white/90">
              ✓ Product Management
            </p>

            <p className="bg-white/15 px-6 py-4 rounded-2xl text-white/90">
              ✓ Order Tracking
            </p>

            <p className="bg-white/15 px-6 py-4 rounded-2xl text-white/90">
              ✓ Customer Insights
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src={image11}
              alt="Kode Commerce"
              className="w-44 h-auto"
            />
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-300 text-center mb-8">
            Sign in to your admin dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-700/40 border border-slate-600/50 text-white placeholder-slate-300 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {fieldErrors.email && (<p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>)}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-700/40 border border-slate-600/50 text-white placeholder-slate-300 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {fieldErrors.password && (<p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>)}
            </div>
            {error && (<p className="text-red-400 text-sm">{error}</p>)}


             <button
  type="submit"
  disabled={loading}
className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-2xl font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"

            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-600/60"></div>
            <span className="text-sm text-slate-300">OR</span>
            <div className="flex-1 h-px bg-slate-600/60"></div>
          </div>
          <button
            type="button"
            className="w-full bg-slate-700/40 border border-slate-600/50 rounded-2xl py-3.5 flex items-center justify-center gap-3 text-white font-semibold hover:bg-slate-700/60 transition cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-sm text-slate-400 text-center mt-8">
            Secure Account Access
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
