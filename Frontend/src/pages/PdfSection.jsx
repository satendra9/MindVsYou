import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";
import { ChevronDown } from "lucide-react";

const PdfSection = () => {
  const { section } = useParams();

  const [openSubject, setOpenSubject] = useState(null);
  const [pdfs, setPdfs] = useState({
    science: [],
    maths: [],
  });

  useEffect(() => {
    fetchPdfs("science");
    fetchPdfs("maths");
  }, [section]);

  const fetchPdfs = async (subject) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${section}/${subject}`,
      );

      setPdfs((prev) => ({
        ...prev,
        [subject]: res.data || [],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (pdfId, subject) => {
    if (!window.confirm("Delete this PDF?")) return;

    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/${section}/${subject}/${pdfId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPdfs((prev) => ({
        ...prev,
        [subject]: prev[subject].filter((pdf) => pdf._id !== pdfId),
      }));
    } catch (err) {
      console.error(err);
      alert("Unauthorized or failed to delete PDF");
    }
  };

  const handleEdit = async (pdf, subject) => {
    const newTitle = prompt("Enter new title", pdf.title);
    if (!newTitle) return;

    try {
      const token = sessionStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/${section}/${subject}/${pdf._id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPdfs((prev) => ({
        ...prev,
        [subject]: prev[subject].map((p) =>
          p._id === pdf._id ? { ...p, title: newTitle } : p,
        ),
      }));
    } catch (err) {
      console.error(err);
      alert("Unauthorized or failed to edit PDF");
    }
  };

  const toggle = (subject) => {
    setOpenSubject(openSubject === subject ? null : subject);
  };

  const renderSubject = (subject, label) => (
    <div className="border rounded mb-4">
      <button
        onClick={() => toggle(subject)}
        className="w-full flex justify-between items-center px-5 py-4 text-lg font-semibold"
      >
        {label}
        <ChevronDown
          className={`transition-transform ${
            openSubject === subject ? "rotate-180" : ""
          }`}
        />
      </button>

      {openSubject === subject && (
        <div className="px-4 pb-4 space-y-3">
          {isTeacher() && (
            <Link
              to={`/record/${section}/${subject}/upload`}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded !no-underline text-xs font-bold"
            >
              Upload {label} PDF
            </Link>
          )}

          {pdfs[subject].length === 0 ? (
            <p className="text-gray-500 text-xs font-bold mt-2">
              No PDFs uploaded yet
            </p>
          ) : (
            pdfs[subject].map((pdf) => (
              <div
                key={pdf._id}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4 p-3 border-b"
              >
                {/* PDF TITLE */}
                <p className="font-bold text-sm break-words">{pdf.title}</p>

                {/* ACTIONS */}
                <div className="flex gap-4 md:gap-3 md:justify-end">
                  <a
                    href={pdf.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="!no-underline font-bold text-xs text-blue-600 px-2 py-1"
                  >
                    View
                  </a>

                  {isTeacher() && (
                    <>
                      <button
                        className="font-bold text-xs text-yellow-700 px-2 py-1"
                        onClick={() => handleEdit(pdf, subject)}
                      >
                        Edit
                      </button>

                      <button
                        className="font-bold text-xs text-red-700 px-2 py-1"
                        onClick={() => handleDelete(pdf._id, subject)}
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
      )}
    </div>
  );

  return (
    <div>
      <div className="mt-6 ml-6">
        <Link
          to="/record/courses"
          className="!no-underline text-black text-xs font-bold border hover:bg-gray-100 px-3 py-2 rounded"
        >
          Go back to Courses
        </Link>
      </div>

      <div className="p-4 max-w-3xl mx-auto">
        <p className="text-2xl font-bold text-gray-800 mb-6">
          {section.toUpperCase()} PDFs
        </p>

        {renderSubject("science", "Science")}
        {renderSubject("maths", "Maths")}
      </div>
    </div>
  );
};

export default PdfSection;
