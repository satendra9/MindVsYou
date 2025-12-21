import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewPdf() {
  const { id } = useParams();
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/record/pdfs/${id}`)
      .then((res) => setPdf(res.data))
      .catch(() => setError("PDF not found"));
  }, [id]);

  if (error) return <p className="text-center mt-10">{error}</p>;
  if (!pdf) return <p className="text-center mt-10">Loading...</p>;

  return (
    <iframe
      src={pdf.pdfUrl}
      title={pdf.title}
      className="w-full h-screen"
    />
  );
}

