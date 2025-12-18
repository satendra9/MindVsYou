import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const About = () => {

      const [email, setEmail] = useState('')
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate();
    
        const emailSaveHandle = () => {
            const data = {
                email,
            }
            setLoading(true);
            axios.post('http://localhost:5000/record/emailform',data).then(()=>{
                setLoading(false);
                navigate('/record/emailsuccess');
            }).catch((error)=>{
                setLoading(false);
                alert('an error occurred, please check email');
                console.log(error);
            })
        }

    return (
        <>
         <div className="bg-yellow-200">
            <nav className="flex">
                <div className="ml-6 mt-6">
                    <h1>MindVsYou</h1>
                </div>
                <div className="ml-60"> 
                    <ul className="flex space-x-4 mt-2">
                        <li><Link to="/" className="text-black">Home</Link></li>
                        <li><Link to="/record/courses" className="text-black">Courses</Link></li>
                        <li><Link to="/record/policy" className="text-black">Privacy Policy</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="flex mt-24">
                <div className="ml-24">
                <p className="ml-4 text-5xl font-medium">Who We Are</p>
                <p>MindvsYou is a modern learning space designed for students of<br/> Class 8 to 12 who want clarity, confidence, and consistency in<br/> their studies</p>  
                <p>We combine personal coaching, AI-powered daily practice,<br/> and simple-to-understand teaching to help students score<br/> higher without stress.</p>  
                <p>For years, we noticed one problem:<br/>
                Students don’t fail because they’re weak. They fail because<br/> they don’t practice the right questions every day.</p>
                <p>So we built MindvsYou to fix exactly that.</p>
                </div>
                <div>
                    <Image src="/bookbundle.jpg" className="w-132 ml-56"/>
                </div>
            </div>
            </div>
            <div className="bg-white flex">
            <div>
                <Image src="/bookbundle2.jpg" className="w-120 h-150 ml-24 mt-14"/>
            </div>
            <div className="mt-14 ml-14">
                <h1>AI + Coaching = Better Results</h1>
                <p>MindvsYou is one of the first coaching centers to introduce an<br/> AI quiz chatbot for daily learning.</p>
                <p>Students receive:</p>
                <p>
                    <ol className="list-disc">
                <li>10 daily questions</li>
                <li>Chapter-wise & topic-wise quizzes</li>
                <li>Instant answers</li>
                <li>Smart tracking</li>
                <li>Practice without books or pressure</li>
                    </ol>
                </p>
                <p>This routine helps them stay consistent and score better.</p>
            </div>
            </div>
            <div className="mt-14 bg-yellow-200">
                <div className="ml-32">
                    <h1 className="mt-32">Meet The Founder</h1>
                    <p className="ml-20 font-medium">Shilpi Singh</p>
                    <p className="ml-6">Founder, MindvsYou Learning<br/>
                       B.Tech, IIT (ISM) Dhanbad</p>
                </div>
                <div className="flex gap-40 mt-96 bg-linear-to-r from-yellow-200 to-yellow-200 h-96">
                   <div className="ml-8 mt-14 text-black"><h1>MindVsYou</h1></div>
                   <div className="mt-14">
                       <ul className=" md:flex space-x-8 text-lg font-sans">
                           <li>
                             <li className="hover:text-black-600 font-sans font-bold"> Explore </li>
                             <li className="hover:text-blue-600"> <Link to="/record/courses" className="text-black">Courses</Link></li>
                             <li className="hover:text-blue-600"> <Link to="/record/about" className="text-black">About</Link></li>
                             <li className="hover:text-blue-600"> <Link to="/record/contact" className="text-black">Contact</Link></li>
                           </li>
                       </ul>
                   </div>
                   <div className="mt-14">
                        <ul className=" md:flex space-x-8 text-lg font-sans">
                           <li >
                             <li className="hover:text-black-600 font-sans font-bold">Follow</li>
                             <li className="hover:text-blue-600"> <Link to="/record/courses" className="text-black">Facebook</Link></li>
                             <li className="hover:text-blue-600"> <Link to="/record/admissionform" className="text-black">Instagram</Link></li>
                             <li className="hover:text-blue-600"> <Link to="/record/contact" className="text-black">Twitter</Link></li>
                           </li>
                       </ul>
                   </div>
                   <div className="mt-14  border-0 text-shadow-black font-light flex-col">
                       <label className='font-bold'>Sign up with your email address to receive news and updates.</label>
                       <input className='w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-50'
                    type='text' name='Email' value={email}
                    onChange={(e)=> setEmail(e.target.value)}  />
                        <div className='mt-2'>
                       <Button className="bg-black mb-2 font-extrabold rounded-b-full px-6 py-3 shadow-2xl hover:shadow-white-400" onClick={emailSaveHandle}>SIGN UP </Button>
                       </div>
                   </div>
                   </div>
            </div>
            </>
    )
}
export default About;