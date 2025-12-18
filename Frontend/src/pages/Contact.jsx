import { Link, useNavigate } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
const Contact = () => {

    const [firstname, setFirstname] = useState("");
    const [secondname, setSecondname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
    

    const contactSaveHandle = () => {
        const data = {
            firstname,
            secondname,
            email,
            message,
        }
        setLoading(true);
        axios.post('http://localhost:5000/record/contactdata', data).then(()=>{
            setLoading(false);
            navigate('/record/contactsuccess');
        }).catch((error)=>{
            setLoading(false);
            alert('an error occurred, please fill all the details');
            console.log(error);
        })

    }
    return (
        <div className="bg-yellow-200">
            <nav className="flex">
                <div className="ml-6 mt-6">
                    <h1>MindVsYou</h1>
                </div>
                <div className="ml-60"> 
                    <ul className="flex space-x-4 mt-2">
                        <li><Link to="/" className="text-black">Home</Link></li>
                        <li><Link to="/record/courses" className="text-black">Courses</Link></li>
                        <li><Link to="/record/about" className="text-black">About</Link></li>
                        <li><Link to="/record/policy" className="text-black">Privacy Policy</Link></li>
                        <li><Link to="/record/testimonials" className="text-black">Testimonials</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="flex w-full">
           <div className="">
            <div className="mt-24 ml-4">
            <div><h1>Contact Us</h1></div>
            <div className="mt-4"><p>Interested in studying with us?
                    Fill out some info and we will be in touch shortly.<br/> 
                    We can’t wait to hear from you!</p>
                    <p>mindvsyou@gmail.com<br/>
                       (+91) 8448970354</p>
                    </div>
           </div>
           <div className="flex">
           <div className="flex-col ml-16 ">
            <div>
            <label>Name:</label>
            </div>
            <div>
            <label>First Name:</label>
            </div>
            <div>
            <input className="w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
         focus:outline-none focus:ring-2 focus:ring-blue-50" type='text' name='First Name' value={firstname}
            onChange={(e)=> setFirstname(e.target.value)}/>
            </div>
            <div>
            <label>Second Name:</label>
            </div>
            <div>
            <input className="w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
         focus:outline-none focus:ring-2 focus:ring-blue-50" type='text' name='Second Name' value={secondname}
            onChange={(e)=> setSecondname(e.target.value)}/>
            </div>
            <div>
            <label>Email:</label>
            </div>
            <div>
            <input className="w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
         focus:outline-none focus:ring-2 focus:ring-blue-50" type='text' name='Email' value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
            
            <label>Message:</label>
            </div>
            <div>
            <input className="w-96 mt-2 px-4 py-10 bg-gray-200 text-black border border-gray-700 rounded-lg
         focus:outline-none focus:ring-2 focus:ring-blue-50" type='text' name='Message' value={message}
            onChange={(e)=> setMessage(e.target.value)}/>
            </div>
            <div><Button className=" bg-black mt-4" onClick={(contactSaveHandle)}>SUBMIT</Button></div>
            </div>
            <div className="">
                <Image src="\books.jpg" className="mt-2 h-96 w-72 ml-96"/>

            </div>
            
           </div>
           </div>
           </div>
           <div className="flex gap-40 mt-14 bg-linear-to-r from-yellow-200 to-yellow-200 h-96">
                   <div className="ml-8 mt-14 text-black"><h1>MindVsYou</h1></div>
                   <div className="mt-14">
                       <ul className=" md:flex space-x-8 text-lg font-sans">
                           <li>
                             <li className="hover:text-black-600 font-sans font-bold"> Explore </li>
                             <li className="hover:text-blue-600"> <Link to="/record/courses" className="text-black">Courses</Link></li>
                             <li className="hover:text-blue-600"> <Link to="/record/admissionform" className="text-black">About</Link></li>
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
                       onChange={(e)=> setEmail(e.target.value)} 
                      />
                        <div className='mt-2'>
                       <Button className="bg-black mb-2 font-extrabold rounded-b-full px-6 py-3 shadow-2xl hover:shadow-white-400" 
                       onClick={emailSaveHandle}>SIGN UP </Button>
                       </div>
                   </div>
               </div>
           </div>
           

    )
}

export default Contact;