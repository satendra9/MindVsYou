import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import isTeacher from "../../middleware/isTeacher";

const TestList = () => {
  const { classname, subject } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacher = isTeacher(); // 👈 compute once

  const fetchTests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/record/pdfs/test/${classname}/${subject}`
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
    if (!window.confirm("Delete this test paper?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/record/pdf/test/${subject}/${id}`,
        { withCredentials: true }
      );
      fetchTests(); // 🔁 refresh list
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading test papers...</p>;
  }

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">
          {classname.toUpperCase()} – {subject.toUpperCase()} Test Papers
        </p>

        {teacher && (
          <Link
            to={`/record/test/${classname}/${subject}/upload`}
            className="bg-red-900 text-white px-4 py-2 rounded !no-underline font-bold text-xs"
          >
            Upload Test Paper
          </Link>
        )}
      </div>

      {/* PDF LIST */}
      {pdfs.length === 0 ? (
        <p className="text-gray-600 text-sm font-bold ">No test papers uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {pdfs.map((pdf) => (
            <li
              key={pdf._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span className="font-medium">{pdf.title}</span>

              <div className="flex gap-4 items-center">
                <Link
                  to={`/record/view/${pdf._id}`}
                  className="text-blue-600 font-semibold"
                >
                  View
                </Link>

                {teacher && (
                  <>
                    <Link
                      to={`/record/edit/${pdf._id}`}
                      className="text-green-600 font-semibold"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(pdf._id)}
                      className="text-red-600 font-semibold"
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
