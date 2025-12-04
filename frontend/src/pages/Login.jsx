import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  // --- LOGIC SECTION (Keep this exactly as you had it) ---
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setError("");
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while login.", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* LEFT SIDE: The "Art" Column (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        {/* Abstract Circle Decoration */}
        <div className="absolute w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 bottom-0 right-0"></div>

        <div className="z-10 text-center px-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">
            FIN<span className="text-emerald-400">TRACK</span>.
          </h1>
          <p className="text-slate-400 text-xl font-light">
            Master your money. Control your future.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="max-w-md w-full animate-fade-in">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Login</h2>
            <p className="text-slate-500">
              Welcome back to the command center.
            </p>
          </div>

          {/* LOGIC BINDING: Error Display */}
          {error && (
            <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 text-red-700 text-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {" "}
            {/* USERNAME INPUT - Floating Label Style */}
            <div className="relative group">
              <input
                type="text"
                name="username"
                id="username"
                value={credentials.username}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>
            {/* PASSWORD INPUT - Floating Label Style */}
            <div className="relative group">
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            {/* ACTION BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded text-white font-bold tracking-wide transition-all duration-200 
    ${
      loading
        ? "bg-slate-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
    }`}
              >
                {loading ? "ACCESSING..." : "LOGIN"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              New user ?{" "}
              <Link
                to="/register"
                className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                Initialize Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
