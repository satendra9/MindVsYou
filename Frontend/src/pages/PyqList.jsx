import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";

const PyqList = () => {
  const { classname, subject } = useParams();
  const [pdfs, setPdfs] = useState([]);

  const teacher = isTeacher();

  useEffect(() => {
    fetchPdfs();
  }, [classname, subject]);

  const fetchPdfs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/pyq/${classname}/${subject}`
    );
    setPdfs(res.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PYQ?")) return;

    try {
      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
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

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <p className="text-lg sm:text-2xl font-bold">
          {classname.toUpperCase()} – {subject.toUpperCase()} PYQs
        </p>

        {teacher && (
          <Link
            to={`/record/pyq/${classname}/${subject}/upload`}
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
              <p className="font-semibold text-sm break-all md:break-words">
                {pdf.title}
              </p>

              {/* ACTIONS */}
              <div className="
                flex flex-wrap items-center gap-4
                md:justify-end md:flex-nowrap
                whitespace-nowrap
              ">
                <a
                  href={pdf.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-bold text-sm !no-underline"
                >
                  View
                </a>

                {teacher && (
                  <>
                    <button
                      onClick={() => handleEdit(pdf)}
                      className="text-yellow-700 font-bold text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(pdf._id)}
                      className="text-red-700 font-bold text-sm"
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




