import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import isUser from "../../middleware/isUser.js";
import isTeacher from "../../middleware/isTeacher.js";
import { logout } from "../pages/logout.jsx";
import { Menu, X } from "lucide-react";

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store session data
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.user.role);
      sessionStorage.setItem("userId", data.user.id);
      sessionStorage.setItem("userEmail", data.user.email);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              {/* <li>
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
              </li> 
              <li></li>
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
              </li>  */}
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
          {/*}    <li>
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
              </li> 
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
              </li>  */}  
            </ul>
          </div>
        )}
      </nav>

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        
        {/* Brand */}
        <p className="text-3xl font-bold text-green-800 mb-2">
          MindvsYou
        </p>

        <p className="text-black-500 text-sm mb-8 font-medium">
          Access premium exam-oriented notes instantly
        </p>

        {/* Google Login */}
        <div className="flex justify-center">
          {loading ? (
            <div className="text-blue-600 font-semibold animate-pulse">
              Signing you in...
            </div>
          ) : (<div className="w-full max-w-sm mx-auto scale-100">
              <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => alert("Login Failed")}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              />
</div>
            
          )}
        </div>

        {/* Trust line */}
        <p className="text-xs text-gray-900 mt-8 mt-2 font-light">
          Secure login • No spam • Trusted by 1000+ students
        </p>
      </div>
    </div>
    </>
  );
};

export default UserLogin;
