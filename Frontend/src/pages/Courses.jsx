import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import isTeacher from "../../middleware/isTeacher.js";
import { logout } from "../pages/logout.jsx";
import SelectGoal from "./SelectGoal.jsx";
import Footer from "./Footer.jsx";
import isUser from "../../middleware/isUser.js";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center">
                    <img
                      src="/mindvsyou-logo.JPG"
                      alt="Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
      
                  {/* Desktop Menu */}
                  <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <li>
                      <Link to="/" className="text-black !no-underline">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/record/courses" className="text-black !no-underline">
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/record/about" className="text-black !no-underline">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/record/contact" className="text-black !no-underline">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link to="/record/policy" className="text-black !no-underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/record/blogs" className="text-black !no-underline">
                        Blogs
                      </Link>
                    </li>
                {/*     <li>
                      {isUser() ? (
                        <button
                          onClick={() => {
                            logout();
                            setOpen(false);
                          }}
                          className="text-black font-semibold text-left"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          onClick={() => setOpen(false)}
                          to="/api/auth/user-login"
                          className="border border-black rounded px-3 py-2 text-black w-fit !no-underline"
                        >
                          User Login
                        </Link>
                      )}
                    </li> */}
                    
                    <li>
                      {isTeacher() ? (
                        <button
                          onClick={logout}
                          className="text-black font-semibold"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          to="/api/auth/teacher-login"
                          className="border border-black rounded px-3 py-1.5 text-black !no-underline hover:bg-gray-100"
                        >
                          Teacher Login
                        </Link>
                      )}
                    </li>
                  </ul>
      
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-700"
                  >
                    {open ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
      
              {/* Mobile Menu */}
              {open && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                  <ul className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
                    <li>
                      <Link onClick={() => setOpen(false)} to="/" className="text-black">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setOpen(false)} to="/record/courses" className="text-black">
                        Courses
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setOpen(false)} to="/record/about" className="text-black">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setOpen(false)} to="/record/contact" className="text-black">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setOpen(false)} to="/record/policy" className="text-black">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setOpen(false)} to="/record/blogs" className="text-black">
                        Blogs
                      </Link>
                    </li>
                {/*    <li>
                      {isUser() ? (
                        <button
                          onClick={() => {
                            logout();
                            setOpen(false);
                          }}
                          className="text-black font-semibold text-left"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          onClick={() => setOpen(false)}
                          to="/api/auth/user-login"
                          className="border border-black rounded px-3 py-2 text-black w-fit"
                        >
                          User Login
                        </Link>
                      )}
                    </li> */}
                    <li>
                      {isTeacher() ? (
                        <button
                          onClick={() => {
                            logout();
                            setOpen(false);
                          }}
                          className="text-black font-semibold text-left"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          onClick={() => setOpen(false)}
                          to="/api/auth/teacher-login"
                          className="border border-black rounded px-3 py-2 text-black w-fit"
                        >
                          Teacher Login
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </nav>
      

      {/* PAGE CONTENT */}
      <SelectGoal />

      <Footer />
    </>
  );
};

export default Courses;

