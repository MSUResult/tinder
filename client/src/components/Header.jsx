import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { HeartPulse, User, LogOut, Menu, X } from "lucide-react";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#E6E6FA] to-[#FFD700] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <HeartPulse className="hidden sm:block w-8 h-8 text-[#5D3FD3] transition-transform transform hover:rotate-12" />

              <span className="text-2xl font-bold text-[#5D3FD3] hidden sm:inline">
                Swipe less, connect more!
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-90 transition duration-200"
                >
                  <img
                    src={authUser.image || "/avatar.png"}
                    className="h-10 w-10 object-cover rounded-full border-2 border-[#5D3FD3] shadow-sm"
                    alt="User avatar"
                  />
                  <span className="text-[#5D3FD3] font-medium">
                    {authUser.name}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#FFF5D1] rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="mr-2" size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-[#5D3FD3] hover:text-[#A680E2] transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="bg-[#FFF5D1] text-[#5D3FD3] px-4 py-2 rounded-full font-medium hover:bg-[#E6E6FA] transition duration-200 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#5D3FD3] focus:outline-none transition-transform transform hover:scale-110"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-[#FFF5D1] transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {authUser ? (
            <>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#5D3FD3] hover:bg-[#E6E6FA] transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
