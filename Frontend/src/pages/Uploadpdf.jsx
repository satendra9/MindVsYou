import { useState } from "react";
import axios from "axios";

export default function UploadPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    await axios.post("https://mindvsyou-1.onrender.com/record/upload", formData);
    alert("PDF Uploaded");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>

      <form onSubmit={uploadPdf} className="space-y-4">
        <input
          type="text"
          placeholder="PDF Title"
          className="border p-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Upload
        </button>
      </form>
    </div>
  );
}