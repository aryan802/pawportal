import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
	<nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
		<Link to="/" className="font-bold text-xl">PawPortal</Link>
		<div>
			<Link
				to="/login"
				className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition border-2 border-pink-400"
			>
				Login
			</Link>
			<Link
				to="/register"
				className="bg-white border-2 border-pink-400 text-pink-500 px-4 py-2 rounded-full font-semibold hover:bg-pink-50 transition"
			>
				Sign Up
			</Link>
		</div>
	</nav>
);

export default Navbar;
