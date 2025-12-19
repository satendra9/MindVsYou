import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


const PdfDetails = () => {
 const { id } = useParams(); // sectionId from URL
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const sectionNames = {
  1: "Class 8",
  2: "Class 9",
  3: "Class 10",
  4: "Class 11",
  5: "Class 12",
  6: "IIT JEE",
  7: "NEET",
};

  const emailSaveHandle = () => {
          const data = {
              email,
          }
          setLoading(true);
          axios.post('https://mindvsyou-1.onrender.com/record/emailform',data).then(()=>{
              setLoading(false);
              navigate('/record/emailsuccess');
          }).catch((error)=>{
              setLoading(false);
              alert('an error occurred, please check email');
              console.log(error);
          })
        }

  // Fetch PDFs by section
  const getPdfs = async () => {
    try {
      const res = await axios.get(`https://mindvsyou-1.onrender.com/record/get-pdfs/${id}`);
      setPdfs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPdfs();
  }, [id]);

  // Submit PDF
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);
    formData.append("section", id);

    await axios.post("https://mindvsyou-1.onrender.com/record/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    getPdfs();
  };

  // Open PDF
  const showPdf = (pdfUrl) => {
  window.open(pdfUrl, "_blank");
};

  // Delete PDF
  const deletePdf = async (pdfId) => {
    if (!window.confirm("Delete this PDF?")) return;

    await axios.delete(`https://mindvsyou-1.onrender.com/record/delete-pdf/${pdfId}`);
    setPdfs((prev) => prev.filter((p) => p._id !== pdfId));
  };

  const editPdfName = async (id) => {
  try {
    await axios.put(`https://mindvsyou-1.onrender.com/record/edit-pdf/${id}`, {
      title: newTitle,
    });

    // Update UI immediately
    setPdfs(
      pdfs.map((pdf) =>
        pdf._id === id ? { ...pdf, title: newTitle } : pdf
      )
    );

    setEditingId(null);
    setNewTitle("");

  } catch (error) {
    console.error(error);
    alert("Failed to update PDF name");
  }
};

  return (
    <>
    <div>
      <h1 className="text-2xl text-center underline font-bold mb-4">{sectionNames[id] || "Section"}</h1>
      <nav className="flex">
                
                <div className="ml-12"> 
                    <ul className="flex space-x-4 mt-2">
                        <li><Link to="/" className="text-black">Home</Link></li>
                        <li><Link to="/record/courses" className="text-black">Courses</Link></li>
                        <li><Link to="/record/policy" className="text-black">Privacy Policy</Link></li>
                        
                    </ul>
                </div>
            </nav>
    </div>
    <div className="p-6 max-w-2xl mx-auto">

      {/* UPLOAD FORM */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-3">Upload PDF</h2>

        <input
          type="text"
          placeholder="Enter Title"
          className="border p-2 w-full mb-3"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 w-full mb-3"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>

      {/* SHOW PDFs */}
      <h2 className="text-xl font-bold mb-4">{sectionNames[id] || "Section"}</h2>

      {pdfs.length === 0 ? (
        <p>No PDFs uploaded in this section.</p>
      ) : (
        pdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="flex justify-between items-center p-3 bg-gray-100 border rounded mb-2"
          >
            {editingId === pdf._id ? (
  <input
    type="text"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    className="border p-2 rounded"
  />
) : (
  <h6 className="text-gray-800 font-medium">{pdf.title}</h6>
)}

            <div className="space-x-4">
              {editingId === pdf._id ? (
    <button
    className="px-3 py-2 bg-blue-600 text-white rounded-lg space-x-2"
    onClick={() => editPdfName(pdf._id)}
  >
    Save
  </button>
) : (
    <button
    className="px-3 py-2 bg-yellow-600 text-white rounded-lg"
    onClick={() => {
      setEditingId(pdf._id);
      setNewTitle(pdf.title);
    }}
  >
    Edit
    </button>
)}
      <button
        className="bg-green-600 text-white px-3 py-2"
        onClick={() => showPdf(pdf.pdfUrl)}

      >
    View
    </button>

      <button
        className="bg-red-600 text-white px-3 py-2"
        onClick={() => deletePdf(pdf._id)}
      >
    Delete
      </button>
        </div>
        </div>
        ))
      )}
      </div>
      <div className="flex gap-40 mt-14 bg-linear-to-r from-gray-200 to-gray-300 h-96">
      <div className="ml-8 mt-14 text-black"><h1>MindVsYou</h1></div>
                            <div className="mt-14">
                                <ul className=" md:flex space-x-8 text-lg font-sans">
                                    <li>
                                      <li className="hover:text-black-600 font-sans"> Explore </li>
                                      <li className="hover:text-blue-600"> <Link to="/courses">Courses</Link></li>
                                      <li className="hover:text-blue-600"> <Link to="/about">About</Link></li>
                                      <li className="hover:text-blue-600"> <Link to="/contact">Contact</Link></li>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-14">
                                 <ul className=" md:flex space-x-8 text-lg font-sans">
                                    <li >
                                      <li className="hover:text-black-600 font-sans"> Follow Us </li>
                                      <li className="hover:text-blue-600"> <Link to="/courses">Facebook</Link></li>
                                      <li className="hover:text-blue-600"> <Link to="/admissionform">Instagram</Link></li>
                                      <li className="hover:text-blue-600"> <Link to="/contact">Twitter</Link></li>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-14  border-0 text-shadow-black font-light flex-col">
                                <label className='font-bold'>Sign up with your email address to receive news and updates.</label>
                                <input className='w-96 mt-2 px-4 py-2 bg-gray-200 text-black border border-gray-700 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-50' type='text' name='Email' value={email}
                                onChange={(e)=> setEmail(e.target.value)}/>
                                 <div className='mt-2'>
                                <button className="bg-gray-800 px-3 py-2 text-white rounded" onClick={emailSaveHandle}>SIGN UP </button>
                                </div>
                            </div>
                            </div>
                           
      </>
    );
    }
export default PdfDetails;