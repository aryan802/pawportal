import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRedirectRoute } from "../../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(form.email, form.password);
      
      if (result.success) {
        // Redirect based on user role
        const redirectRoute = getRedirectRoute(result.user.role);
        navigate(redirectRoute);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <div className="flex justify-between items-center text-sm">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-pink-500 hover:underline">
              Sign Up
            </Link>
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;