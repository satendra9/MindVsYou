import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPdf = () => {
  const { section } = useParams();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file); // must match multer field name

    console.log("Uploading for section:", section); // ✅ debug

    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/record/upload/${section}`,
      formData
    );

    alert("PDF uploaded");
    navigate(`/record/${section}`);
    
  };

  return (
    <form onSubmit={handleUpload} className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload PDF for {section}</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
      />

      <button className="bg-blue-600 text-white px-4 py-2 mt-4">
        Upload
      </button>
    </form>
  );
};

export default UploadPdf;
