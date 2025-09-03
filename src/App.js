import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PetListings from "./pages/adoption/PetListings";
import PetTracking from "./pages/dashboard/PetTracking";
import HirePetWalker from "./pages/dashboard/HirePetWalker";
import VetBooking from "./pages/dashboard/VetBooking";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";
import SellBuyPet from "./pages/dashboard/SellBuyPet";
import InsuranceComparison from "./pages/dashboard/InsuranceComparison";
import Trainers from "./pages/dashboard/Trainers";
import LostFound from "./pages/dashboard/LostFound";
import CommunityForums from "./pages/dashboard/CommunityForums";
import Events from "./pages/dashboard/Events";
import ShelterAdminDashboard from "./pages/dashboard/ShelterAdminDashboard";
import ManagePets from "./pages/dashboard/ManagePets";
import AdoptionRequests from "./pages/dashboard/AdoptionRequests";
import ManageStaff from "./pages/dashboard/ManageStaff";
import OrganiseEvents from "./pages/dashboard/OrganiseEvents";
import ReportsAnalytics from "./pages/dashboard/ReportsAnalytics";
import Messages from "./pages/dashboard/Messages";
import ModeratorDashboard from "./pages/dashboard/ModeratorDashboard";
import ModeratePosts from "./pages/dashboard/ModeratePosts";
import ReviewReports from "./pages/dashboard/ReviewReports";
import ManageUsers from "./pages/dashboard/ManageUsers";
import ModeratorMessages from "./pages/dashboard/ModeratorMessages";
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
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pet-tracking" element={<PetTracking />} />
            <Route path="/marketplace" element={<SellBuyPet />} />
            <Route path="/pet-walker" element={<HirePetWalker />} />
            <Route path="/vet-booking" element={<VetBooking />} />
            <Route path="/insurance" element={<InsuranceComparison />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/community-forums" element={<CommunityForums />} />
            <Route path="/events" element={<Events />} />
            <Route path="/shelter-admin-dashboard" element={<ShelterAdminDashboard />} />
            <Route path="/manage-pets" element={<ManagePets />} />
            <Route path="/adoption-requests" element={<AdoptionRequests />} />
            <Route path="/shelter-staff" element={<ManageStaff />} />
            <Route path="/shelter-events" element={<OrganiseEvents />} />
            <Route path="/shelter-reports" element={<ReportsAnalytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
            <Route path="/moderate-posts" element={<ModeratePosts />} />
            <Route path="/review-reports" element={<ReviewReports />} />
            <Route path="/user-management" element={<ManageUsers />} />
            <Route path="/moderator-messages" element={<ModeratorMessages />} />
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


