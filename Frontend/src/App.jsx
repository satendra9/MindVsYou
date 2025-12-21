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
import UploadPdf from "./pages/Uploadpdf.jsx";
import PdfList from "./pages/Pdflist.jsx";
import ViewPdf from "./pages/Viewpdf.jsx";
import EditPdf from "./pages/Editpdf.jsx";
import "./App.css";

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
    <Route path="/record/uploadpdf" element={<UploadPdf />} />
    <Route path="/record/pdfs" element={<PdfList />} />
    <Route path="/record/pdfs/:id" element={<ViewPdf />} />
    <Route path="/record/edit/:id" element={<EditPdf />} />
    
  </Routes>
 

  )
      
}

export default App
