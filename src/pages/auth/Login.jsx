
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Owner");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login for demo: accept any email/password
    localStorage.setItem("user", JSON.stringify({ email, role }));
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-8 rounded shadow flex flex-col gap-4 mt-8">
      <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded px-3 py-2" required />
      <select value={role} onChange={e => setRole(e.target.value)} className="border rounded px-3 py-2">
        <option value="Owner">Pet Owner</option>
        <option value="Admin">Admin</option>
        <option value="ShelterAdmin">Shelter Admin</option>
        <option value="Moderator">Moderator</option>
        <option value="SystemAdmin">System Admin</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button>
    </form>
  );
}

export default Login;
