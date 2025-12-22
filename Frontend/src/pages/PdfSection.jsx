import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PdfSection = () => {
  const { section } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchPdfs();
  }, [section]);

  const fetchPdfs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${section}`
      );
      setPdfs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  /* 🔴 DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${id}`
    );

    setPdfs(pdfs.filter(pdf => pdf._id !== id));
  };

  /* ✏️ EDIT */
  const handleEdit = async (id) => {
    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${id}`,
      { title: newTitle }
    );

    setEditingId(null);
    setNewTitle("");
    fetchPdfs();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{section.toUpperCase()}</h1>

        <Link
          to={`/record/${section}/upload`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload PDF
        </Link>
      </div>

      {pdfs.length === 0 && <p>No PDFs uploaded</p>}

      {pdfs.map(pdf => (
        <div
          key={pdf._id}
          className="border rounded p-4 mb-4 shadow-sm"
        >
          {/* TITLE */}
          {editingId === pdf._id ? (
            <input
              className="border p-2 w-full mb-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <h3 className="font-semibold mb-2">{pdf.title}</h3>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3">
            {/* VIEW */}
            <a
              href={pdf.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              View
            </a>

            {/* EDIT */}
            {editingId === pdf._id ? (
              <button
                onClick={() => handleEdit(pdf._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(pdf._id);
                  setNewTitle(pdf.title);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}

            {/* DELETE */}
            <button
              onClick={() => handleDelete(pdf._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfSection;

