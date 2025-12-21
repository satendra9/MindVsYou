import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);

  const fetchPdfs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/record/pdfs`);
    setPdfs(res.data);
  };

  const deletePdf = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${id}`);
    fetchPdfs();
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">PDF Library</h2>

      {pdfs.map((pdf) => (
        <div
          key={pdf._id}
          className="flex justify-between items-center border p-4 rounded mb-3"
        >
          <span>{pdf.title}</span>

          <div className="flex gap-4">
            <Link to={`/record/pdfs/${pdf._id}`} className="text-blue-600">
              View
            </Link>

            <Link to={`/record/edit/${pdf._id}`} className="text-green-600">
              Edit
            </Link>

            <button
              onClick={() => deletePdf(pdf._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}