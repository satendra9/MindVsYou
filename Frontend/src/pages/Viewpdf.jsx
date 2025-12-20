import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewPdf() {
  const { id } = useParams();
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    axios.get("https://mindvsyou-1.onrender.com/record/pdfs").then((res) => {
      setPdf(res.data.find((p) => p._id === id));
    });
  }, [id]);

  if (!pdf) return <p className="text-center mt-10">Loading...</p>;

  return (
    <iframe
      src={pdf.pdfUrl}
      title="PDF Viewer"
      className="w-full h-screen"
    />
  );
}