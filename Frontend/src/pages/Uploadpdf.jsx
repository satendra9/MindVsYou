import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("PDF uploaded successfully");

    // ✅ Redirect BACK to SAME PYQ LIST
    if (isPyq) {
      navigate(`/record/pyq/${classname}/${subject}`, { replace: true });
    }else {
  navigate(`/record/${section}`, { replace: true });
}
  };

  return (
    <form className="p-6 max-w-md mx-auto mt-24" onSubmit={handleUpload}>
      <p className="text-xl font-bold mb-4">
        Upload {subject.toUpperCase()} PDF ({classname?.toUpperCase()})
      </p>

      <input
        className="border p-2 w-full mb-3"
        placeholder="PDF Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded text-xs font-bold">
        Upload
      </button>
    </form>
  );
};

export default UploadPdf;
