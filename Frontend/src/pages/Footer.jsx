import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#00b894]">
                MindVsYou
              </span>
            </div>

            <p className="mt-4 text-gray-600 text-sm max-w-xs">
              MindVsYou is democratising education, making it accessible to all.
              Join the revolution, learn on India’s largest learning platform.
            </p>

            {/* App Buttons */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/7905574323?text=Hi%21"
                target="_blank"
                rel="noopener noreferrer"
                className="
                mt-8
                inline-block
                bg-[#00b894]
                hover:bg-[#00a37f]
                text-white
                font-semibold
                px-6
                py-3
                rounded
                transition
                !no-underline
                "
              >
              Go to our MindVsYou ChatBot
              </a>
              </div>

            {/* Contact */}
            <div className="mt-8">
              <p className="font-bold text-gray-800">Reach out to us</p>
              <p className="text-sm text-gray-600 mt-1">
                Get your questions answered about learning with Unacademy.
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-bold text-gray-800">
                <Phone size={16} />
                Call +91 7838782723
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">Company</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/record/about" className="!no-underline">About Us</Link></li>
              <li><Link to="/record/blogs" className="!no-underline">Blogs</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Privacy Policy</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Terms And Conditions</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">
              Help & support
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/record/policy" className="!no-underline">User Guidelines</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Site Map</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Refund Policy</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Takedown Policy</Link></li>
              <li><Link to="/record/policy" className="!no-underline">Grievance Redressal</Link></li>
            </ul>
          </div>

          

          {/* Popular Goals */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">
              Popular Goals
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/record/courses" className="!no-underline">
                IIT JEE
                </Link>
                </li>
              <li>
                <Link to="/record/courses" className="!no-underline">
                NEET
                </Link>
                </li>
              <li>
                <Link to="/record/courses" className="!no-underline">
                Class 12th
                </Link>
                </li>
              <li>
                <Link to="/record/courses" className="!no-underline">
                Class 10th
                </Link>
                </li>
            </ul>
          </div>
          
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            MindVsYou Technologies Pvt Ltd
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-600">
            <Facebook size={18} />
            <Twitter size={18} />
            <Youtube size={18} />
            <Instagram size={18} />
            <Linkedin size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
