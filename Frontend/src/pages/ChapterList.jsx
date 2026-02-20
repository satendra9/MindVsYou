import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

const ChapterList = () => {
  const { section, subject } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const token = sessionStorage.getItem("token");
  
  const [pendingChapter, setPendingChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChapters = async () => {
    console.log("Component Rendered");

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/chapters/${section}/${subject}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Fetched Chapters:", res.data);

    setChapters(res.data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
  fetchChapters();
  console.log("useeffect running")
}, [section, subject]);

  // 🔐 Try opening notes first
  const openNotes = async (chapter) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/chapters/access/${chapter._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Access allowed
      window.open(res.data.driveLink, "_blank");
    } catch (err) {
      // ❌ No access → open Razorpay
      buyNow(chapter);
    }
  };

  // 💳 Razorpay Payment
  const buyNow = (chapter) => {
  if (!token) {
    navigate("/api/auth/user-login");
    return;
  }

  setPendingChapter(chapter);
  continuePayment();
}

const continuePayment = async () => {
  if (!token) {
    navigate("/api/auth/user-login");
    return;
  }

  try {
    setIsLoading(true);

    const chapter = pendingChapter;

    // 1️⃣ Create order
    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-order`,
      { chapterId: chapter._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (order.freeMode) {
  await fetchChapters();
  return;
}


    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "MindvsYou Learning",
      description: chapter.title,

      handler: async function (response) {
        // 3️⃣ Verify payment
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/payments/verify`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            chapterId: chapter._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Redirect back to chapter list
        await fetchChapters();
        setPendingChapter(null);

      },

      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
  
};



return (
  <>
   <div className="min-h-screen bg-gray-50 py-10 px-4">
  <div className="max-w-4xl mx-auto">

    <div className="mb-4">
  <Link
  to="/record/courses"
  className="
    inline-flex items-center gap-1
    text-sm font-semibold text-blue-600
    mb-3
    hover:text-blue-800
    !no-underline
  "
>
  ← Back to Courses
</Link>
</div>


    {/* Heading */}
    <div className="mb-8">
      <h1 className="font-extrabold text-xl sm:text-2xl mb-1 text-gray-800">
        CHEMISTRY E-Notes
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-5">
      High-quality exam-oriented notes • Instant access after purchase
    </p>
    </div>

    {/* Chapter Cards */}
   <div className="space-y-6">
  {chapters.map((chapter, index) => (
    <div
      key={chapter._id}
      className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between"
    >
      {/* Left Side */}
      <div>
        <div className="flex items-center gap-4">
          <div className="text-blue-600 font-extrabold text-base sm:text-lg shrink-0 mb-3">
              {String(index + 1).padStart(2, "0")}
            </div>
          <p className="font-bold text-gray-800 text-sm sm:text-base leading-snug">
                {chapter.title}
              </p>
        </div>
         <p className="text-xs text-gray-500 mt-0.5">
                PDF Notes • Instant Download
              </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-green-600 font-semibold text-lg">
          ₹{chapter.price}
        </span>

        {chapter.isPurchased ? (
          <>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium">
              Paid
            </span>

            <a
              href={chapter.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md 
              font-bold transition !no-underline"
            >
              Download
            </a>
          </>
        ) : (
          <>
            <button
              onClick={() => buyNow(chapter._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition"
            >
              Buy Now
            </button>

            
          </>
        )}
      </div>
    </div>
  ))}
</div>


    {/* Trust Box */}
     <div className="mt-8 sm:mt-10 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 text-center">
      <p className="font-bold text-blue-700 text-xs sm:text-sm">
        ✔ Trusted by 1000+ students
      </p>
      <p className="text-xs text-blue-600 mt-1">
        Secure payments • Lifetime access • Teacher-made notes
      </p>
    </div>
  </div>
</div>
<Footer />
  </>
);




};

export default ChapterList;



