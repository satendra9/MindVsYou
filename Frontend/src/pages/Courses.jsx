import React from 'react';
import axios from 'axios';
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Courses = () => {
     const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const emailSaveHandle = () => {
        const data = {
            email,
        }
        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/record/emailform`,data).then(()=>{
            setLoading(false);
            navigate('/record/emailsuccess');
        }).catch((error)=>{
            setLoading(false);
            alert('an error occurred, please check email');
            console.log(error);
        })
      }

  const cards = [
  { id: 1, title: "Class 8th" },
  { id: 2, title: "Class 9th" },
  { id: 3, title: "Class 10th" },
  { id: 4, title: "Class 11th" },
  { id: 5, title: "Class 12th" },
  { id: 6, title: "IIT JEE" },
  { id: 7, title: "NEET" },
];

const { id } = useParams();
const card = cards.find((c) => c.id === Number(id));

const sliderRef = useRef(null);

useEffect(() => {
  const slider = sliderRef.current;

  const interval = setInterval(() => {
    if (slider) {
      slider.scrollBy({
        left: 300,
        behavior: "smooth",
      });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 10
      ) {
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        }, 300);
      }
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);

    return (
      <>
      <div>
        <nav className="bg-cover bg-center bg-no-repeat h-20 border-1 border-amber-100" >
          <div className="flex">
            <ul className="flex space-x-4 ml-4 mt-4">
              <li><Link to="/" className="text-black no-underline">Home</Link></li>
              <li><Link to="" className="text-black no-underline">Courses For Kids</Link></li>
              <li><Link to="/record/Pdfdetails" className="text-black no-underline">Study Materials</Link></li>
              <li><Link to="" className="text-black no-underline">Offline Centers</Link></li>
              <li><Link to="/record/contact" className="text-black no-underline">Contacts</Link></li>
              <li><Link to="/record/about" className="text-black no-underline">About</Link></li>
              <li className='ml-120'><button className='bg-gray-500 ml-60 rounded w-48 px-3 py-2'><Link to="" className=" text-white !no-underline">Talk to our expert</Link></button></li>
            </ul>
          </div>
            </nav>
            <div className="w-6xl h-56 border-2 rounded-2xl ml-24">
              <div className="ml-8 mt-16">
              <h1 className="text-7xl mt-8 ml-80">MindVsYou Learning</h1>
              </div>
              <div className="w-4xl h-56 border-2 rounded-4xl ml-30 mt-8">
                <label className="bg-lime-300 text-black rounded ml-4 mt-4 px-2 py-2">Popular Courses</label>
              </div>
            </div>
            <div className="mt-52 ml-20">
              <div>
                <h1>Explore Courses</h1>
              </div>
              <div className="flex mt-4 space-x-10">
                <div className=" rounded-2xl w-80 h-96">
                  <div className="w-full h-96 bg-cover bg-center rounded-2xl"  
                style={{ backgroundImage: "url('/BookBack3.jpg')" }}>
                  <label className="font-medium ml-2 mt-2">Class 8-12</label>
                  <h4 className="mt-0.5 ml-16">Competitive Exams</h4>
                  <div className="flex flex-wrap gap-2 ml-4">
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">JEE</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">NEET</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">EAMCET</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">JEE/NEET FOUNDATION</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">JEE Books</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">NEET Books</button>
                  </div>
                  <div className="ml-8 mt-24"><button className="bg-orange-500 hover:bg-red-200 text-black px-2 py-2 rounded">EXPLORE COURSES</button></div>
                </div>
                </div>
                <div className="rounded-2xl w-80 h-96">
                <div className="w-full h-96 bg-cover bg-center rounded-2xl"  
                style={{ backgroundImage: "url('/BookBack3.jpg')" }}>
                   <label className="font-medium ml-2 mt-2">Class 8-12</label>
                  <h4 className="mt-0.5 ml-16">School Tutions</h4>
                  <div className="flex flex-wrap gap-2 ml-4">
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">CBSE BOARD</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">ICSE BOARD</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">8-12 ALL BOARDS</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">JEE/NEET FOUNDATION</button>
                  </div>
                  <div className="ml-8 mt-24"><button className="bg-orange-500 hover:bg-red-200 text-black px-2 py-2 rounded">EXPLORE COURSES</button></div>
                </div>
                </div>
                <div className="rounded-2xl w-80 h-96">
                  <div className="w-full h-96 bg-cover bg-center rounded-2xl"  
                style={{ backgroundImage: "url('/BookBack3.jpg')" }}>
                   <label className="font-medium ml-2 mt-2">Class 8-12</label>
                  <h4 className="mt-0.5 ml-16">Courses For Kids</h4>
                  <div className="flex flex-wrap gap-2 ml-4">
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">LEARN MATH</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">LEARN SCIENCE</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">SPOKEN ENGLISH</button>
                  <button className="bg-red-500 text-black font-medium px-2 py-2 rounded">LEARN CODING</button>
                  </div>
                  <div className="ml-8 mt-36"><button className="bg-orange-500 hover:bg-red-200 text-black px-2 py-2 rounded">EXPLORE COURSES</button></div>
                </div>
                </div>
              </div>
              
            </div>
            <div className="w-full h-96 bg-cover bg-center rounded-2xl mt-16"
            style={{ backgroundImage: "url('/BookSession.jpg')" }}>
              <div className="mt-4 ml-8">
              <h1 className="mt-12">Book your free Demo Session</h1>
              <h4>Get a free academic counselling session</h4>
              <button className="h-24 w-56 rounded px-2 py-2 font-extrabold hover:hover:bg-red-200 bg-orange-500">Book a free demo</button>
              </div>
            </div>
            <div>
              <div>
                <div className='mt-4 ml-4'>
                <h1 className='text-5xl font-serif'>STUDY MATERIALS</h1>
                </div>
                <div className="w-full p-6 ">
      <div className="w-full h-42 bg-cover bg-center rounded-2xl mt-0"
            style={{ backgroundImage: "url('')" }}>
      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar "
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[250px] bg-gray-500 p-6 rounded-2xl mt-4 shadow-xl border animate-slide-left pause-hover border-black border-1"
          >
            <h3 className="text-white font-semibold">{card.title}</h3>
            <button className="bg-orange-500 hover:bg-orange-600 text-black px-2 py-2 rounded">
              <Link to={`/record/pdfdetails/${card.id}`} className='text-black !no-underline'>STUDY MATERIAL</Link>
            </button>
          </div>
        ))}
      </div>
      </div>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-center'>Achieve more with MindVsYou, get Free online counselling now</h3>
                <div className='flex justify-center space-x-4'>
                  <div>
                  <button className='bg-orange-600 hover:bg-orange-600 text-white px-2 py-2 rounded w-60'>Book A Demo</button>
                  </div>
                  <div>
                  <button className='bg-white text-orange-600 font-medium border-2 border-black px-2 py-2 rounded w-60'>Learn Live</button>
                  </div>
                </div>
              </div>
              <div className='bg-orange-400 h-52 w-full rounded mt-4 text-white'>
                <div className='ml-4'>
                <h3 className='text-center'>Happy to help you!</h3>
                <p>Need more details? Our expert academic counsellors will be happy to <br/>patiently explain everything that you want to know.</p>
                <button className='bg-gray-900 text-white w-60 px-2 py-2 rounded font-medium'>Speak to an Expert</button>
                </div>
              </div>
              <div className='mt-4 border-2 rounded px-4 py-4 bg-gray-300'
              style={{ backgroundImage: "url('')" }}>
                <h1>Learn from anywhere</h1>
                <p>We’re available on Android devices and platforms. <br/>Study from anywhere at your convenience.</p>
                <Image src='/google-play-store-badge.png' className='w-80' />
              </div>
              <div className="flex gap-40 mt-14 bg-linear-to-r from-gray-200 to-gray-300 h-96">
                      <div className="ml-8 mt-14 text-black"><h1>MindVsYou</h1></div>
                      <div className="mt-14">
                          <ul className=" md:flex space-x-8 text-lg font-sans">
                              <li>
                                <li className="hover:text-black-600 font-sans"> Explore </li>
                                <li className="hover:text-blue-600"> <Link to="/courses">Courses</Link></li>
                                <li className="hover:text-blue-600"> <Link to="/about">About</Link></li>
                                <li className="hover:text-blue-600"> <Link to="/contact">Contact</Link></li>
                              </li>
                          </ul>
                      </div>
                      <div className="mt-14">
                           <ul className=" md:flex space-x-8 text-lg font-sans">
                              <li >
                                <li className="hover:text-black-600 font-sans"> Follow Us </li>
                                <li className="hover:text-blue-600"> <Link to="/courses">Facebook</Link></li>
                                <li className="hover:text-blue-600"> <Link to="/admissionform">Instagram</Link></li>
                                <li className="hover:text-blue-600"> <Link to="/contact">Twitter</Link></li>
                              </li>
                          </ul>
                      </div>
                      <div className="mt-14  border-0 text-shadow-black font-light flex-col">
                          <label className='font-bold'>Sign up with your email address to receive news and updates.</label>
                          <input className='w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-50' type='text' name='Email' value={email}
                          onChange={(e)=> setEmail(e.target.value)}/>
                           <div className='mt-2'>
                          <Button className="bg-black mb-2 font-extrabold rounded-b-full px-6 py-3 shadow-2xl hover:shadow-white-400" onClick={emailSaveHandle}>SIGN UP </Button>
                          </div>
                      </div>
            </div>
            </div>
          </div>
      </>
  )

}
export default Courses;