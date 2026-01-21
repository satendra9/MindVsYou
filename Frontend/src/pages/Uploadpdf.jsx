import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const UploadPdf = () => {
  const { classname, subject, section } = useParams();
  const navigate = useNavigate();

  const isPyq = window.location.pathname.includes("/record/pyq");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    const uploadUrl = isPyq
      ? `${import.meta.env.VITE_API_BASE_URL}/record/upload/pyq/${classname}/${subject}`
      : `${import.meta.env.VITE_API_BASE_URL}/record/upload/${section}/${subject}`;

    await axios.post(uploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    alert("PDF uploaded successfully");

    // Redirect back to the list
    if (isPyq) {
      navigate(`/record/pyq/${classname}/${subject}`, { replace: true });
    } else {
      navigate(`/record/${section}`, { replace: true });
    }
  };

  return (
    <>
      <div className="ml-6 mt-6">
        <button className="border rounded px-2 py-2">
          <Link
            to="/record/courses"
            className="text-sm font-bold !text-green-800 !no-underline"
          >
            Go back to Courses
          </Link>
        </button>
      </div>
      <form
        className="p-6 max-w-md mx-auto mt-16 md:mt-24"
        onSubmit={handleUpload}
      >
        <p className="text-xl font-bold mb-4 text-center md:text-left">
          Upload {subject.toUpperCase()} PDF{" "}
          {section && `(${section.toUpperCase()})`}
        </p>

        {/* Title input */}
        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* File selector and Upload button side by side */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          {/* File selector */}
          <label className="flex-1 cursor-pointer w-full">
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition">
              {file ? (
                <p className="text-sm font-semibold text-gray-700 break-all">
                  📄 {file.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500 font-semibold">
                  Click to choose a PDF file
                </p>
              )}
            </div>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>

          {/* Upload button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-green-700 transition w-full md:w-auto"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default UploadPdf;
