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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/chapters/${section}/${subject}`)
      .then((res) => setChapters(res.data))
      .catch(console.error);
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
  const buyNow = async (chapter) => {
    const userId = sessionStorage.getItem("userId");
    const email = sessionStorage.getItem("email");

    if (!userId) {
      alert("Please login first");
      return;
    }

    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-order`,
      {
        userId,
        chapterId: chapter._id,
        amount: chapter.price,
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "E-Notes",
      description: chapter.title,
      handler: async function (response) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payments/verify`, {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          chapterId: chapter._id,
          userId,
        });

        navigate("/payment-success");
      },
      prefill: {
        email,
      },
      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

return (
  <div className="max-w-4xl mx-auto px-3 sm:px-4 py-5">
    {/* Header */}
    {/* Back to courses */}
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

    <h1 className="font-extrabold text-xl sm:text-2xl mb-1 text-gray-800">
      {subject.toUpperCase()} E-Notes
    </h1>
    <p className="text-xs sm:text-sm text-gray-500 mb-5">
      High-quality exam-oriented notes • Instant access after purchase
    </p>

    {/* Chapter list */}
    <div className="space-y-3 sm:space-y-4">
      {chapters.map((ch, index) => (
        <div
          key={ch._id}
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between
            border rounded-xl p-4 bg-white shadow-sm
            hover:shadow-md hover:border-blue-500 transition
          "
        >
          {/* LEFT */}
          <div className="flex items-start gap-3">
            {/* Serial */}
            <div className="text-blue-600 font-extrabold text-base sm:text-lg shrink-0">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <div>
              <p className="font-bold text-gray-800 text-sm sm:text-base leading-snug">
                {ch.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                PDF Notes • Instant Download
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Price */}
            <span className="text-green-600 font-bold text-sm sm:text-base">
              ₹{ch.price}
            </span>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => buyNow(ch)}
                className="
                  bg-blue-600 text-white
                  px-4 sm:px-5 py-2
                  rounded-lg text-xs sm:text-sm font-bold
                  hover:bg-blue-700 active:scale-95 transition
                "
              >
                Buy Now
              </button>

              <button
                onClick={() => openNotes(ch)}
                className="
                  border border-gray-300
                  px-4 py-2
                  rounded-lg text-xs sm:text-sm font-bold
                  hover:bg-gray-100 transition
                "
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Trust box */}
    <div className="mt-8 sm:mt-10 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 text-center">
      <p className="font-bold text-blue-700 text-xs sm:text-sm">
        ✔ Trusted by 1000+ students
      </p>
      <p className="text-xs text-blue-600 mt-1">
        Secure payments • Lifetime access • Teacher-made notes
      </p>
    </div>

    <Footer />
  </div>
);


};

export default ChapterList;



