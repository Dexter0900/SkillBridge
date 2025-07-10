import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "./Button";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow">
      {/* Left: App Name */}
      <div className="font-bold text-2xl tracking-wide text-blue-400">
        <Link to="/">SkillBridge</Link>
      </div>
      {/* Center: Links */}
      <div className="flex-1 flex justify-center gap-6">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors font-medium"
        >
          Home
        </Link>
        <Link
          to="/browse-gigs"
          className="hover:text-blue-400 transition-colors font-medium"
        >
          Browse Gigs
        </Link>
        <Link
          to="/dashboard"
          className="hover:text-blue-400 transition-colors font-medium"
        >
          Dashboard
        </Link>
      </div>
      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-3">
        {!user ? (
          <Link to="/login">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Login
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
