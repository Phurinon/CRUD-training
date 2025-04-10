import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import the SHINE logo or create it as a component
const ShineLogo = () => (
  <div className="flex items-center">
    <span className="text-blue-500 text-2xl font-bold">
      <span className="inline-block mr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </span>
      SHINE
    </span>
  </div>
);

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("authtoken");

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Navigation items
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "INFO", path: "/info", requiresAuth: true }, // add requiresAuth flag
  ];

  return (
    <nav className="bg-blue-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <ShineLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 ">
          {" "}
          {/* Add ml-auto to push the nav items to the right */}
          {navItems
            .filter((item) => !item.requiresAuth || isLoggedIn) // Show only if requiresAuth is true and user is logged in
            .map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-blue-500 font-medium"
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Display Sign in / Sign up or Logout */}
        <div className="hidden md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="border border-blue-400 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="border border-blue-400 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-blue-400 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-3 px-4 pt-2 pb-4">
            {navItems
              .filter((item) => !item.requiresAuth || isLoggedIn) // Show only if requiresAuth is true and user is logged in
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-500 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-500 text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-700 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
