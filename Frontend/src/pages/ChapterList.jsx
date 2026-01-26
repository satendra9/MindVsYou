import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ChapterList = () => {
  const { section, subject } = useParams();
  const [chapters, setChapters] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/chapters/${section}/${subject}`
      )
      .then((res) => setChapters(res.data))
      .catch(console.error);
  }, [section, subject]);

  // 🔐 Try opening notes first
  const openNotes = async (chapterId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/chapters/access/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Access allowed
      window.open(res.data.driveLink, "_blank");
    } catch (err) {
      // ❌ No access → redirect to payment
      buyNow(chapterId);
    }
  };

  // 💳 Payment redirect
  const buyNow = (chapterId) => {
    window.location.href =
      `https://payments.pabbly.com/subscribe/YOUR_LINK?chapterId=${chapterId}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="font-bold text-xl mb-4">
        {subject.toUpperCase()} – E-Notes
      </h1>

      {chapters.map((ch) => (
        <div
          key={ch._id}
          className="flex justify-between items-center border-b py-3"
        >
          <p className="font-bold text-sm">{ch.title}</p>

          <button
            onClick={() => openNotes(ch._id)}
            className="text-blue-600 font-bold text-xs hover:underline"
          >
            E-Notes ₹{ch.price}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;

