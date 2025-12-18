import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Pdflist = () => {
    const [pdfs, setPdfs] = useState([]);

   useEffect(() => {
        axios.get("http://localhost:5000/record/pdfs")
            .then(res => setPdfs(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
     <div>
            <h1>Available PDFs</h1>

            {pdfs.map((pdf, index) => (
                <div key={index} style={{ margin: "10px 0" }}>
                    <a
                        href={`http://localhost:5000/record/view/${(pdf.filename)}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {pdf.filename}
                    </a>
                </div>
            ))}
        </div>
    )
}
export default Pdflist;