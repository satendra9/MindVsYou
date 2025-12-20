import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPdf() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("https://mindvsyou-1.onrender.com/record/pdfs").then((res) => {
      const pdf = res.data.find((p) => p._id === id);
      setTitle(pdf.title);
    });
  }, [id]);

  const updateTitle = async (e) => {
    e.preventDefault();
    await axios.put(`https://mindvsyou-1.onrender.com/record/pdfs/${id}`, { title });
    navigate("/pdfs");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit PDF Title</h2>

      <form onSubmit={updateTitle} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
}
