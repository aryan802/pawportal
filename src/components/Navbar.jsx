import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
	<nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
		<Link to="/" className="font-bold text-xl">PawPortal</Link>
		<div>
			<Link to="/login" className="mr-4 hover:underline">Login</Link>
			<Link to="/register" className="hover:underline">Register</Link>
		</div>
	</nav>
);

export default Navbar;
