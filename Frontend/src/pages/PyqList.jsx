import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";

const PyqList = () => {
  const { classname, subject, year } = useParams();
  const [pdfs, setPdfs] = useState([]);

  const teacher = isTeacher();

  useEffect(() => {
    if (classname && subject && year) {
      fetchPdfs();
    }
  }, [classname, subject, year]);

  const fetchPdfs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/pyq/${classname}/${subject}/${year}`
    );
    setPdfs(res.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PYQ?")) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/pyq/${subject}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPdfs((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Unauthorized or failed to delete PYQ");
    }
  };

  const handleEdit = async (pdf) => {
    const newTitle = prompt("Enter new title", pdf.title);
    if (!newTitle) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/pyq/${subject}/${pdf._id}`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPdfs((prev) =>
        prev.map((p) =>
          p._id === pdf._id ? { ...p, title: newTitle } : p
        )
      );
    } catch {
      alert("Unauthorized or failed to edit PYQ");
    }
  };

  if (!year) {
    return (
      <p className="text-red-600 font-semibold">
        Please select a year
      </p>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <p className="text-lg sm:text-2xl font-bold">
          {classname.toUpperCase()} – {subject.toUpperCase()} ({year}) PYQs
        </p>

        {teacher && (
          <Link
            to={`/record/pyq/${classname}/${subject}/${year}/upload`}
            className="bg-green-600 text-white px-4 py-2 rounded text-xs sm:text-sm font-bold w-fit !no-underline"
          >
            Upload PYQ
          </Link>
        )}
      </div>

      {/* LIST */}
      {pdfs.length === 0 ? (
        <p className="text-gray-500 font-semibold">
          No PYQs uploaded yet
        </p>
      ) : (
        <div className="space-y-3">
          {pdfs.map((pdf) => (
            <div
              key={pdf._id}
              className="
                bg-white border rounded-lg p-4
                flex flex-col gap-3
                md:grid md:grid-cols-[1fr_auto]
                md:items-center
              "
            >
              {/* TITLE */}
              <p className="font-semibold text-sm break-words">
                {pdf.title}
              </p>

              {/* ACTIONS */}
              {/* ACTIONS */}
<div className="flex flex-wrap items-center gap-2 md:gap-3 md:justify-end">
  {/* VIEW */}
  <a
    href={pdf.pdfUrl}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center
      px-3 py-1.5
      text-xs font-bold
      text-blue-600 border border-blue-600
      rounded-full
      
      transition
      !no-underline
    "
  >
    View
  </a>

  {teacher && (
    <>
      {/* EDIT */}
      <button
        onClick={() => handleEdit(pdf)}
        className="
          inline-flex items-center justify-center
          px-3 py-1.5
          text-xs font-bold
          text-yellow-700 border border-yellow-500
          rounded-full
          hover:bg-yellow-500 hover:text-white
          transition
        "
      >
        Edit
      </button>

      {/* DELETE */}
      <button
        onClick={() => handleDelete(pdf._id)}
        className="
          inline-flex items-center justify-center
          px-3 py-1.5
          text-xs font-bold
          text-red-700 border border-red-600
          rounded-full
          hover:bg-red-600 hover:text-white
          transition
        "
      >
        Delete
      </button>
    </>
  )}
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PyqList;
