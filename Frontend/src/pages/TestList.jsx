import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";

const TestList = () => {
  const { classname, section, subject } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacher = isTeacher();

  const fetchTests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdfs/test/${classname}/${subject}`
      );
      setPdfs(res.data);
    } catch (err) {
      console.error("Error fetching test papers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [classname, subject]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/pdf/${section}/${subject}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setPdfs((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete PDF");
    }
  };

  const handleEdit = async (id, title) => {
    const newTitle = prompt("Enter new title", title);
    if (!newTitle) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/record/pdf/${section}/${subject}/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setPdfs((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading test papers...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-lg sm:text-2xl font-bold leading-tight">
          {classname.toUpperCase()} – {subject.toUpperCase()} Test Papers
        </h1>

        {teacher && (
          <Link
            to={`/record/test/${classname}/${subject}/upload`}
            className="bg-red-900 text-white px-4 py-2 rounded text-xs font-bold text-center !no-underline"
          >
            Upload Test Paper
          </Link>
        )}
      </div>

      {/* LIST */}
      {pdfs.length === 0 ? (
        <p className="text-gray-600 text-sm font-bold">
          No test papers uploaded yet.
        </p>
      ) : (
        <ul className="space-y-4">
  {pdfs.map((pdf) => (
    <li
  key={pdf._id}
  className="border-b py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
>
  {/* TITLE */}
  <p className="text-sm font-bold text-gray-800 break-words">
    {pdf.title}
  </p>

  {/* ACTIONS */}
  <div className="flex items-center gap-4 text-xs font-bold">
    {/* VIEW — everyone */}
    <a
      href={pdf.pdfUrl}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 !no-underline hover:underline"
    >
      View
    </a>

    {/* EDIT / DELETE — teacher only */}
    {teacher && (
      <>
        <button
          onClick={() => handleEdit(pdf._id, pdf.title)}
          className="text-yellow-700 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(pdf._id)}
          className="text-red-700 hover:underline"
        >
          Delete
        </button>
      </>
    )}
  </div>
</li>

  ))}
</ul>

      )}
    </div>
  );
};

export default TestList;

