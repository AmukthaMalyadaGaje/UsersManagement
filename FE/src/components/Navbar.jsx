import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-500 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-xl font-bold">
          User Management
        </Link>

        {/* Conditional Rendering */}
        <div className="flex gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="py-2 px-4 bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
