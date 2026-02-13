import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { User } from "lucide-react";
import isUser from "../../middleware/isUser.js";
import isTeacher from "../../middleware/isTeacher.js";
import { logout } from "../pages/logout.jsx";
import { Search } from "lucide-react";
import SelectGoal from "./SelectGoal.jsx";
import { CheckCircle } from "lucide-react";
import FeaturesSection from "./FeatureSection.jsx";
import GetAppSection from "./GetAppSection.jsx";
import StartLearningSection from "./StartLearningSection.jsx";
import Footer from "./Footer.jsx";
import { Menu, X } from "lucide-react";


const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [open, setOpen] = useState(false);
  

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const testimonials = [
    {
      name: "Swayamprabha Verma",
      message:
        "Mind vs You is an excellent centre for Maths and Science! Shilpi is a very sincere and hardworking teacher. She leaves no stone unturned in guiding her pupils. I would highly recommend her.",
      class: "Class 10th",
      rating: "5",
    },
    {
      name: "Neha Karve",
      message:
        "The Teacher gives personal attention to each student, simplified learning and brilliant results.  If the students are with them, you can relax they are in the right hands.Thank you.",
      class: "Class 9th",
    },
    {
      name: "Pratima Sawhney",
      message:
        "Very innovative way of teaching she teaches and makes student self study in front of her,my son excelled in Maths and science in her guidance .last but not the least she makes  student deciplined .",
      class: "Class 8th",
    },
    {
      name: "Kalpana Mishra",
      message: "Excellent teaching skills and the best teacher",
      class: "Class 10th",
    },
    {
      name: "Gulshan Prakash",
      message: "Very Experienced Teachers",
      class: "Class 10th",
    },
    {
      name: "Subhash Walaskar",
      message: "Fine Experience",
      class: "Class 10th",
    },
  ];


  const emailSaveHandle = () => {
    const data = {
      email,
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/record/emailform`, data)
      .then(() => {
        setLoading(false);
        navigate("/record/emailsuccess");
      })
      .catch((error) => {
        setLoading(false);
        alert("an error occurred, please check email");
        console.log(error);
      });
  };

  return (
     <div className="w-full overflow-x-hidden">
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
              </li> */}
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
           {/*}   <li>
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

  <div className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
  <div className="flex flex-col md:flex-row items-center gap-12">
    
    {/* Email Section */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
        Crack your goals with <br className="hidden md:block" />
        India’s top educators
      </p>

      <p className="font-semibold text-gray-800 mt-4">
        Know more about our courses.
      </p>

      <div className="mt-4">
        <input
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="bg-gray-600 text-white px-6 py-2 rounded font-medium text-sm mt-4 w-full sm:w-auto"
        onClick={emailSaveHandle}
      >
        Join for free
      </button>
    </div>

    {/* RIGHT IMAGE */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/contactUspage.JPG"
        alt="Students"
        className="rounded-3xl w-full max-w-md md:max-w-lg"
      />
    </div>

  </div>
</div>


    <div className="mt-24 ml-6 text-gray-800">
          <SelectGoal />
    </div>
    
    <div>
      <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Image */}
          <div className="rounded-xl overflow-hidden">
            <img
              src="/Classroom.jpeg" // replace with your image path
              alt="Unacademy Centre"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            {/* Badge */}
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
              Introducing ✨
            </p>

            {/* Heading */}
            <p className="mt-2 text-2xl md:text-3xl font-bold text-gray-800">
              MindVsYou Centre for CBSE and ICSE Preparation
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-base font-medium">
              Admissions open in Lucknow!
            </p>

            {/* Feature List */}
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1" size={20} />
                <span className="text-gray-700">
                  Learn from top educators in your city
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1" size={20} />
                <span className="text-gray-700">
                  In-person classes & doubt solving
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1" size={20} />
                <span className="text-gray-700">
                  Bonus access to online learning
                </span>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="https://wa.me/7084211247?text=Hi%21"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-[#3c4852] hover:bg-[#2f3a42] text-white font-semibold px-6 py-3 rounded transition !no-underline"
            >
            Whatsapp Us!
            </a>

          </div>
        </div>
      </div>
    </section>
    </div>

    <div>
      <FeaturesSection />
    </div>

          {/* TESTIMONIALS */}
<section className="bg-[#f7f9fb] py-14 sm:py-20 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    
    {/* Heading */}
    <div className="text-center mb-10">
      <p className="text-sm text-gray-600 mb-2 font-medium">
        ⭐ Rated <span className="font-semibold">4.9/5</span> by Parents & Students
      </p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">
        What our learners say
      </p>
    </div>

    {/* Left Arrow */}
    <button
      onClick={slideLeft}
      className="hidden md:flex items-center justify-center absolute left-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-sm w-10 h-10 rounded-full hover:bg-gray-50"
    >
      <ChevronLeft className="w-5 h-5 text-gray-600" />
    </button>

    {/* Slider */}
    <div
      ref={sliderRef}
      className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
    >
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="min-w-[280px] sm:min-w-[320px] bg-white border border-gray-200 rounded-xl p-5 sm:p-6"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>

          {/* Message */}
          <p className="text-sm text-gray-700 leading-relaxed mb-5">
            “{t.message}”
          </p>

          {/* User */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {t.name}
            </h3>
            <p className="text-xs text-gray-500">{t.class}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={slideRight}
      className="hidden md:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-sm w-10 h-10 rounded-full hover:bg-gray-50"
    >
      <ChevronRight className="w-5 h-5 text-gray-600" />
    </button>
  </div>
</section>

    <div>
      <GetAppSection />
    </div>

    <div>
      <StartLearningSection />
    </div>

    <div>
      < Footer />
    </div>
    </div>
  );
};
export default Home;

//git checkout master
//git remote add frontend-remote https://github.com/mindvsyou/Mindvsyoufrontend.git
//git remote -v
//git fetch frontend-remote
//git pull frontend-remote frontend
//git push frontend-remote master:frontend