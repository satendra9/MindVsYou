import React from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import EmailSuccess from "./pages/EmailSuccess.jsx";
import ContactSuccess from "./pages/ContactSuccess.jsx";
import Contact from "./pages/Contact.jsx";  
import "./App.css";
import PdfDetails from "./pages/PdfDetails.jsx";
import Pdflist from "./pages/Pdflist.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Math8chapters from "./pages/Math8chapters.jsx";

function App() {

  return (
  
  <Routes>
    <Route path = "/" element = {<Home />} />
    <Route path = "/record/courses" element = {<Courses />} />
    <Route path = "/record/aboutus" element = {<PrivacyPolicy />} />
    <Route path = "/record/blogs" element = {<Testimonials />} />
    <Route path = "/record/contact" element = {<Contact />} />
    <Route path = "/record/about" element = {<About />} />
    <Route path = "/record/contactsuccess" element = {<ContactSuccess />} />
    <Route path = "/record/emailsuccess" element = {<EmailSuccess />} />
    <Route path = "/record/policy" element = {<PrivacyPolicy />} />
    <Route path="/record/pdfdetails/:id" element={<PdfDetails />} />
    <Route path = "/record/pdflist" element = {<Pdflist />} />
    <Route path = "/record/chatbot" element = {<Chatbot />} />
    <Route path = "/record/Math8chapters" element = {<Math8chapters />} />
    
  </Routes>
 

  )
      
}

export default App
