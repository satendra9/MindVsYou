import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const PrivacyPolicy = () => {
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
                        <li><Link to="/record/about" className="text-black">About</Link></li>
                        <li><Link to="/record/contact" className="text-black">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="ml-6 mt-8">
            <h1 className="text-7xl">Privacy policy</h1>
        </div>
        <div className="ml-6">
            <p>MindvsYou Learning (“we”, “our”, or “us”) operates educational services including our WhatsApp-based AI chatbot that provides quizzes, learning<br/> 
            assistance, and communication to students.</p>
            <p>This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our services.</p>
            <p>---------</p>
            <p>1. Information We Collect</p>
            <p>We may collect the following information when you use our WhatsApp chatbot or website:</p>
            <p>a) Personal Information</p>
            <p>•	Name<br/>

	•	Phone number<br/>

	•	Class/grade<br/>

	•	School details (optional)<br/>

	•	Any information you voluntarily share while interacting with the chatbot</p>
    <p>
        b) Usage & Interaction Data</p>

	<p>•	Quiz responses<br/>

	•	Chat messages<br/>

	•	Preferences, topics, and subjects you choose<br/>

	•	Time and frequency of usage<br/>

	•	Analytics related to performance improvement<br/>
    </p>
    <p>c) Technical Data</p>
    <p>
        •	Device type<br/>

	•	IP address (if using the website)<br/>

	•	Browser information (if using the website)<br/>

⸻
    </p>
    <p>2. How We Use Your Information</p>
    <p>
        We use your data strictly for educational and service-related purposes, including:
    </p>
    <p>
        •	Delivering quizzes and practice tests<br/>

	•	Personalizing your learning experience<br/>

	•	Sending updates, reminders, or study notifications<br/>

	•	Improving our chatbot and educational services<br/>

	•	Providing customer support<br/>

	•	Internal analytics to enhance student outcomes<br/>

We do not sell, rent, or trade your data with any third party.<br/>

⸻
    </p>
    <p>3. Sharing of Data</p>
    <p>Your data is never shared with third-party companies except:</p>
    <p>
        •	To comply with legal requirements<br/>

	•	To integrate with WhatsApp Cloud API (Meta), which is required to deliver services<br/>

	•	With trusted service providers who help us operate the chatbot (e.g., hosting platforms), but only if they follow strict confidentiality rules<br/>

⸻
    </p>
    <p>4. Data Security</p>
    <p>We use reasonable administrative and technical measures to keep your data safe, including:</p>
    <p>
        •	Secured servers<br/>

	•	Encrypted communication<br/>

	•	Limited access to authorized team members only<br/>

However, no method of transmission is 100% secure. We strive to protect your data but cannot guarantee absolute security.<br/>

⸻
    </p>
    <p>5. Data Retention</p>
    <p>We keep your data only as long as necessary to:</p>
    <p>
        •	Provide educational services<br/>

	•	Maintain your learning records<br/>

	•	Comply with legal obligations<br/>

You may request deletion of your data anytime.<br/>

⸻
    </p>
    <p>6. Your Rights</p>
    <p>You have the right to:</p>
    <p>
        •	Access the data we hold<br/>

	•	Request correction or deletion<br/>

	•	Stop receiving messages<br/>

	•	Withdraw consent<br/>

	•	Ask questions about how your data is used<br/>

To exercise your rights, contact us at the email below.<br/>

⸻
    </p>
    <p>7. Children’s Privacy</p>
    <p>Our services are intended for students of Class 8 to 12.</p>
    <p>We take extra precautions to protect minors’ data and use it only for educational purposes.<br/>
       ⸻ 
    </p>
    <p>8. Changes to This Policy</p>
    <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
    </p>
        </div>
         <div className="flex gap-40 mt-14 bg-linear-to-r from-yellow-200 to-yellow-200 h-96">
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
                      />
                        <div className='mt-2'>
                       <Button className="bg-black mb-2 font-extrabold rounded-b-full px-6 py-3 shadow-2xl hover:shadow-white-400">SIGN UP </Button>
                       </div>
                   </div>
               </div>
        </>
    )
}
export default PrivacyPolicy;