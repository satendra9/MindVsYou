import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";

const PyqList = () => {
  const { classname, subject } = useParams();
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchPdfs();
  }, [classname, subject]);

  const fetchPdfs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/pyq/${classname}/${subject}`
    );
    setPdfs(res.data || []);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PYQ?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/pyq/${subject}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPdfs((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Unauthorized or failed to delete PYQ");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (pdf) => {
    const newTitle = prompt("Enter new title", pdf.title);
    if (!newTitle) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/pyq/${subject}/${pdf._id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPdfs((prev) =>
        prev.map((p) =>
          p._id === pdf._id ? { ...p, title: newTitle } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unauthorized or failed to edit PYQ");
    }
  };

  return (
    <div className="p-4">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">
          {classname.toUpperCase()} – {subject.toUpperCase()} PYQs
        </p>

        {isTeacher() && (
          <Link
            to={`/record/pyq/${classname}/${subject}/upload`}
            className="bg-green-600 text-white px-4 py-2 rounded text-xs font-bold !no-underline"
          >
            Upload PYQ
          </Link>
        )}
      </div>

      {/* ===== LIST ===== */}
      {pdfs.length === 0 ? (
        <p className="text-gray-500 font-bold">
          No PYQs uploaded yet
        </p>
      ) : (
        pdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 border p-3 mb-3 rounded"
          >
            {/* TITLE */}
            <p className="font-bold text-sm break-words">
              {pdf.title}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4 md:justify-end">
              {/* VIEW – EVERYONE */}
              <a
                href={pdf.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold text-xs"
              >
                View
              </a>

              {/* TEACHER ONLY */}
              {isTeacher() && (
                <>
                  <button
                    onClick={() => handleEdit(pdf)}
                    className="text-yellow-700 font-bold text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(pdf._id)}
                    className="text-red-700 font-bold text-xs"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PyqList;


