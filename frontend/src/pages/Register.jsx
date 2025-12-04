import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; // Fixed import path
import { Link } from "react-router-dom";

const Register = () => {
  // --- YOUR LOGIC (UNCHANGED) ---
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setError("");
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Destructure to exclude confirmPassword before sending to API
      const { username, email, password } = userData;
      await register({ username, email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while register.", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- DESIGN SECTION ---
  return (
    <div className="flex min-h-screen bg-white overflow-hidden font-outfit">
      {/* SECTION 1: The Form (Now on the LEFT) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="max-w-md w-full animate-fade-in">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Create Account
            </h2>
            <p className="text-slate-500">
              Start your journey to financial freedom.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 text-red-700 text-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            {/* USERNAME */}
            <div className="relative group">
              <input
                type="text"
                name="username"
                id="username"
                value={userData.username}
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
            {/* EMAIL */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>
            {/* PASSWORD */}
            <div className="relative group">
              <input
                type="password"
                name="password"
                id="password"
                value={userData.password}
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
            {/* CONFIRM PASSWORD */}
            <div className="relative group">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor="confirmPassword"
                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>
            {/* SUBMIT BUTTON */}
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
                {loading ? "CREATING ACCOUNT..." : "REGISTER"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: The Art (Now on the RIGHT) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 top-20 right-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-20 bottom-0 left-0"></div>

        <div className="z-10 text-center px-12 relative">
          {/* Decorative Quote */}
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            "Do not save what is left after spending, but spend what is left
            after saving."
          </h2>
          <p className="text-emerald-400 text-lg font-mono">- Warren Buffett</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
