import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isValidEmail, isValidPassword } from "../../services/authService";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (!isValidEmail(form.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!isValidPassword(form.password)) {
        setError("Password must be at least 8 characters with uppercase, lowercase, and number.");
        return;
      }

      const result = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (result.success) {
        // Redirect to appropriate dashboard based on role (Guest by default)
        navigate("/dashboard");
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
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
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
            placeholder="Password (min 8 chars, uppercase, lowercase, number)"
            className="border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border rounded px-3 py-2"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Note:</strong> New users are assigned "Guest" role by default. 
            Your role will be automatically updated when you adopt a pet or create a pet profile.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;