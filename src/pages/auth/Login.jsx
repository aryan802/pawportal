import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  { value: "Owner", label: "Owner" },
  { value: "ShelterAdmin", label: "Shelter Admin" },
  { value: "Moderator", label: "Moderator" },
  { value: "SystemAdmin", label: "System Admin" },
];

const roleRoutes = {
  Owner: "/owner-dashboard",
  ShelterAdmin: "/shelter-admin-dashboard",
  Moderator: "/dashboard", // You can create a separate dashboard later
  SystemAdmin: "/dashboard", // You can create a separate dashboard later
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: roles[0].value });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email: form.email, role: form.role, name: form.email.split("@")[0] }));
    navigate(roleRoutes[form.role] || "/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
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
            className="bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;