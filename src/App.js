import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
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
import ModeratorAnalytics from "./pages/dashboard/ModeratorAnalytics";
import SystemAdminDashboard from "./pages/dashboard/SystemAdminDashboard";
import ManageAllUsers from "./pages/dashboard/ManageAllUsers";
import ManageRoles from "./pages/dashboard/ManageRoles";
import ViewSystemLogs from "./pages/dashboard/ViewSystemLogs";
import SystemAnalytics from "./pages/dashboard/SystemAnalytics";
import MyPets from "./pages/management/Mypets";
import PetAnalytics from "./pages/management/PetAnalytics";
import HealthDashboard from "./pages/healthcare/HealthDashboard";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <Navbar />
          <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Pet Adoption Listings */}
            <Route path="/pet-listings" element={
              <ProtectedRoute>
                <PetListings />
              </ProtectedRoute>
            } />
            <Route path="/owner-dashboard" element={
              <ProtectedRoute role="Pet Owner">
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pet-tracking" element={
              <ProtectedRoute role="Pet Owner">
                <PetTracking />
              </ProtectedRoute>
            } />
            <Route path="/marketplace" element={
              <ProtectedRoute role="Pet Owner">
                <SellBuyPet />
              </ProtectedRoute>
            } />
            <Route path="/pet-walker" element={
              <ProtectedRoute role="Pet Owner">
                <HirePetWalker />
              </ProtectedRoute>
            } />
            <Route path="/vet-booking" element={
              <ProtectedRoute>
                <VetBooking />
              </ProtectedRoute>
            } />
            <Route path="/insurance" element={
              <ProtectedRoute role="Pet Owner">
                <InsuranceComparison />
              </ProtectedRoute>
            } />
            <Route path="/trainers" element={
              <ProtectedRoute role="Pet Owner">
                <Trainers />
              </ProtectedRoute>
            } />
            <Route path="/lost-found" element={
              <ProtectedRoute>
                <LostFound />
              </ProtectedRoute>
            } />
            <Route path="/community-forums" element={
              <ProtectedRoute>
                <CommunityForums />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/shelter-admin-dashboard" element={
              <ProtectedRoute role="Shelter Admin">
                <ShelterAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manage-pets" element={
              <ProtectedRoute role="Shelter Admin">
                <ManagePets />
              </ProtectedRoute>
            } />
            <Route path="/adoption-requests" element={
              <ProtectedRoute role="Shelter Admin">
                <AdoptionRequests />
              </ProtectedRoute>
            } />
            <Route path="/shelter-staff" element={
              <ProtectedRoute role="Shelter Admin">
                <ManageStaff />
              </ProtectedRoute>
            } />
            <Route path="/shelter-events" element={
              <ProtectedRoute role="Shelter Admin">
                <OrganiseEvents />
              </ProtectedRoute>
            } />
            <Route path="/shelter-reports" element={
              <ProtectedRoute role="Shelter Admin">
                <ReportsAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/moderator-dashboard" element={
              <ProtectedRoute role="Moderator">
                <ModeratorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/moderate-posts" element={
              <ProtectedRoute role="Moderator">
                <ModeratePosts />
              </ProtectedRoute>
            } />
            <Route path="/review-reports" element={
              <ProtectedRoute role="Moderator">
                <ReviewReports />
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <ProtectedRoute role="Moderator">
                <ManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/moderator-messages" element={
              <ProtectedRoute role="Moderator">
                <ModeratorMessages />
              </ProtectedRoute>
            } />
            <Route path="/moderator-analytics" element={
              <ProtectedRoute role="Moderator">
                <ModeratorAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/system-admin-dashboard" element={
              <ProtectedRoute role="System Admin">
                <SystemAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/system-users" element={
              <ProtectedRoute role="System Admin">
                <ManageAllUsers />
              </ProtectedRoute>
            } />
            <Route path="/system-roles" element={
              <ProtectedRoute role="System Admin">
                <ManageRoles />
              </ProtectedRoute>
            } />
            <Route path="/system-logs" element={
              <ProtectedRoute role="System Admin">
                <ViewSystemLogs />
              </ProtectedRoute>
            } />
            <Route path="/system-analytics" element={
              <ProtectedRoute role="System Admin">
                <SystemAnalytics />
              </ProtectedRoute>
            } />
            {/* Pet Management */}
            <Route path="/mypets" element={
              <ProtectedRoute>
                <MyPets />
              </ProtectedRoute>
            } />
            <Route path="/pet-analytics" element={
              <ProtectedRoute>
                <PetAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/health-dashboard" element={
              <ProtectedRoute>
                <HealthDashboard />
              </ProtectedRoute>
            } />
            <Route path="/care-reminders" element={
              <ProtectedRoute>
                <HealthDashboard />
              </ProtectedRoute>
            } />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="System Admin">
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
    </AuthProvider>
  );
}
export default App;