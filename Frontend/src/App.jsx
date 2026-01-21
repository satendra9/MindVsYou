import React from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Blogs from "./pages/Blogs.jsx";
import EmailSuccess from "./pages/EmailSuccess.jsx";
import ContactSuccess from "./pages/ContactSuccess.jsx";
import Contact from "./pages/Contact.jsx";  
import UploadPdf from "./pages/Uploadpdf.jsx";
import PdfList from "./pages/Pdflist.jsx";
import ViewPdf from "./pages/Viewpdf.jsx";
import EditPdf from "./pages/Editpdf.jsx";
import PdfSection from "./pages/PdfSection.jsx";
import TeacherLogin from "./pages/TeacherLogin.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import TeacherRegister from "./pages/TeacherRegister.jsx";
import TeacherRouting from "../src/pages/TeacherRouting.jsx"
import PyqLayout from "./pages/PyqLayout.jsx";
import PyqList from "./pages/PyqList.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";


function App() {

  return (
  
  <Routes>
    

  {/* ===== NORMAL PAGES ===== */}
  <Route path="/" element={<Home />} />
  <Route path="/record/courses" element={<Courses />} />
  <Route path="/record/about" element={<About />} />
  <Route path="/record/blogs" element={<Blogs />} />
  <Route path="/record/contact" element={<Contact />} />
  <Route path="/record/contactsuccess" element={<ContactSuccess />} />
  <Route path="/record/emailsuccess" element={<EmailSuccess />} />
  <Route path="/record/policy" element={<PrivacyPolicy />} />

  {/* ===== AUTH ===== */}
  <Route path="/api/auth/teacher-login" element={<TeacherLogin />} />
  <Route path="/api/auth/teacher-register" element={<TeacherRegister />} />
  

  {/* ===== NORMAL CLASS PDFs ===== */}
  <Route path="/record/:section" element={<PdfSection />} />

  <Route
    path="/record/:section/:subject/upload"
    element={
      <TeacherRouting>
        <UploadPdf />
      </TeacherRouting>
    }
  />

  {/* ===== PYQ ROUTES (✅ NESTED PROPERLY) ===== */}
  <Route path="/record/pyq" element={<PyqLayout />}>

    <Route
      path=":classname/:subject"
      element={<PyqList />}
    />

    <Route
      path=":classname/:subject/upload"
      element={
        <TeacherRouting>
          <UploadPdf />
        </TeacherRouting>
      }
    />

    </Route>
    

    
  </Routes>
 

  )
      
}

export default App
