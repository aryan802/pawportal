import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PetListings from "./pages/adoption/PetListings";
// ...other routes...
<Route path="/login" element={<Login />} />
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Pet Adoption Listings */}
            <Route path="/pet-listings" element={<PetListings />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="Admin">
                  <h1 className="text-3xl font-bold text-blue-600">
                    Admin Panel
                  </h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


