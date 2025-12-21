import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from "lucide-react";
import { User } from "lucide-react";


const Home = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const sliderRef = useRef(null);

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
      rating:"5"
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
      message:
        "Excellent teaching skills and the best teacher",
      class: "Class 10th",
    },
    {
      name: "Gulshan Prakash",
      message:
        "Very Experienced Teachers",
      class: "Class 10th",
    },
    {
      name: "Subhash Walaskar",
      message:
        "Fine Experience",
      class: "Class 10th",
    },
  ];

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

return (
<div className="background">

   
   
    <nav className="bg-cover bg-center bg-no-repeat h-60" 
     style={{ backgroundImage: "url('/notebook22.jpg')" }}>

    <div className='flex'>
    <div className="mt-40 ml-2">
    <h1 className="text-2xl font-bold text-white">MindVsYou Coaching</h1>
    </div>
    <div className='ml-96 text-white font-bold mt-4'>
    <ul className='flex text-white space-x-2'>
    <li className=""><Link to="/record/courses" className='text-white no-underline'>Courses</Link></li>
    <li className=""> <Link to="/record/about" className='text-white no-underline'>About</Link></li>
    <li className=""> <Link to="/record/contact" className='text-white no-underline'>Contact</Link></li>
    <li className=""> <Link to="/record/policy" className='text-white no-underline'>Privacy Policy</Link></li>
    <li className=""> <Link to="/record/blogs" className='text-white no-underline'>Blogs</Link></li>
    <li className=""> <Link to="/record/chatbot" className='text-white no-underline'>Chatbot</Link></li>
    </ul>
    </div>
    </div>
    
    </nav>
   
<section id="home" className="pt-28 pb-20 bg-linear-to-r from-yellow-200 to-yellow-200 text-black">
<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
<div>
<h1 className="text-2xl mt-10 text-black font-Medium font-serif">
WHERE MIND MEETS MASTERY
</h1>
<p className="font-light">
Learn from top educators, access structured courses, and achieve your goals
with personalized mentorship.
</p>
<Button className="bg-black text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-[0_0_30px_#48d3ec]"><Link to="/record/courses" className="!no-underline text-white">Explore Courses</Link>
</Button>
</div>
<div>
<Image src="\students.jpg" rounded />
</div>
</div>
</section>
<div className="flex">
    <div className="mt-auto ml-8">
        <h1 className="w-3xl text-9xl">Introducing your expert guide</h1>
        <p>Step into a classroom led by visionaries who redefine what it means to educate.
           Our instructors don't just teach; they inspire curiosity, innovation, and the 
           passion for lifelong learning.</p>
    </div>
    <div className="w-3xl h-60 mr-8 mt-8">
        <Image src="\lamp.jpg" />
    </div>
</div>
<div className="mt-auto ml-8">
    <div>
    <h1>FAQs</h1>
    </div>
    <div>
    <h2>-------------------------------------------------------------</h2>
    <h3>Question 1</h3>
    <p>It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a 
        hobby into <br/>something more. Or maybe you have a creative project to share with the world. 
        Whatever it is, the way <br/> you tell your story online can make all the difference. </p>
    <h2>-------------------------------------------------------------</h2>
    </div>
     <div>
    
    <h3>Question 2</h3>
    <p>It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a 
        hobby into <br/>something more. Or maybe you have a creative project to share with the world. 
        Whatever it is, the way <br/>you tell your story online can make all the difference.</p>
    <h2>-------------------------------------------------------------</h2>
    </div>
     <div>
   
    </div>
</div>
<div className="relative w-full py-10 mt-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        What Our Customers Say
      </h2>

      {/* Left Arrow */}
      <button
        onClick={slideLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-10"
      >
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white shadow-xl p-6 rounded-xl border border-gray-200"
          >
             <div className="flex items-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className="text-yellow-400 fill-yellow-400"
        />
      ))}
    </div>
            <p className="text-gray-700 italic mb-4">“{t.message}”</p>
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <p>{t.rating}</p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={slideRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <ChevronRight size={28} />
      </button>
    </div>
    <div className='mt-4 border-2 rounded px-4 py-4 bg-gray-200'
                  style={{ backgroundImage: "url('')" }}>
                    <h1>Learn from anywhere</h1>
                    <p>We’re available on Android devices and platforms. <br/>Study from anywhere at your convenience.</p>
                    <Image src='/google-play-store-badge.png' className='w-80' />
                  </div>
    <div className="mt-4 border-2 border-amber-100 text-center px-2 py-2">
        <div>
        <h3>Know more about our courses!</h3>
        <p>Book a free counselling session</p>
        <div className="flex ml-130"> 
        <User className="w-6 h-6 mt-2 text-gray-700" />
        <button className="bg-gray-800 hover:bg-gray-600 text-white px-2 py-2 rounded w-60">Speak to an Expert</button>
        </div>
        </div>
    </div>              
    <div className="flex gap-40 mt-14 bg-linear-to-r from-yellow-200 to-yellow-200 h-96">
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


)
}
export default Home ;
