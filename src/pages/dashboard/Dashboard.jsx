import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => (
	<div className="p-6 bg-white rounded shadow">
		<h1 className="text-2xl font-bold text-green-700 mb-4">Pet Owner Dashboard</h1>
		<ul className="list-disc ml-6">
			<li>My Pets</li>
			<li>Adoption Status</li>
			<li>Healthcare Tracking</li>
			<li>Reminders & Appointments</li>
		</ul>
	</div>
);

const GuestDashboard = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 py-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full flex flex-col items-center relative">
            {/* Pet Illustration (SVG) */}
            <div className="mb-6">
                <svg width="90" height="50" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="90" cy="90" rx="80" ry="10" fill="#F3F4F6" />
                    <circle cx="60" cy="60" r="30" fill="#FF6B6B" />
                    <circle cx="120" cy="60" r="30" fill="#FDE68A" />
                    <ellipse cx="60" cy="80" rx="18" ry="8" fill="#fff" />
                    <ellipse cx="120" cy="80" rx="18" ry="8" fill="#fff" />
                    <circle cx="55" cy="55" r="4" fill="#222" />
                    <circle cx="65" cy="55" r="4" fill="#222" />
                    <circle cx="115" cy="55" r="4" fill="#222" />
                    <circle cx="125" cy="55" r="4" fill="#222" />
                    <rect x="57" y="70" width="6" height="8" rx="3" fill="#222" />
                    <rect x="117" y="70" width="6" height="8" rx="3" fill="#222" />
                </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">
                We’ll take care of your <span className="text-pink-500">PETS</span>
            </h1>
            <p className="text-gray-500 text-center mb-6 max-w-md">
                PawPortal is your one-stop platform for pet adoption, care, and community. Sign up or log in to access personalized features!
            </p>
            <div className="flex gap-4 mb-8">
                <Link to="/login">
                    <button className="bg-pink-500 text-white px-8 py-2 rounded-full font-semibold text-lg border-2 border-pink-400 hover:bg-pink-600 transition shadow">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-white border-2 border-pink-400 text-pink-500 px-8 py-2 rounded-full font-semibold text-lg hover:bg-pink-50 transition shadow">
                        Sign Up
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                <Link to="/pet-listings">
                    <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl font-medium shadow hover:bg-blue-100 transition">
                        Browse Pet Listings
                    </button>
                </Link>
                <Link to="/community-forums">
                    <button className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl font-medium shadow hover:bg-yellow-100 transition">
                        Community Forums
                    </button>
                </Link>
                <Link to="/lost-found">
                    <button className="w-full bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl font-medium shadow hover:bg-green-100 transition">
                        Lost &amp; Found
                    </button>
                </Link>
                <Link to="/events">
                    <button className="w-full bg-purple-50 border border-purple-200 text-purple-700 px-4 py-3 rounded-xl font-medium shadow hover:bg-purple-100 transition">
                        Events
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
	let user = null;
	try {
		user = JSON.parse(localStorage.getItem("user"));
	} catch (e) {
		user = null;
	}

	if (!user) {
		return <GuestDashboard />;
	}
	return <OwnerDashboard />;
};

export default Dashboard;
