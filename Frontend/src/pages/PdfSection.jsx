import { useParams, Link } from "react-router-dom";
import Footer from "./Footer.jsx";

const SUBJECTS_BY_SECTION = {
  class12th: [
    { key: "physics", label: "Physics" },
    { key: "chemistry", label: "Chemistry" },
    { key: "maths", label: "Maths" },
  ],
  default: [
    { key: "science", label: "Science" },
    { key: "maths", label: "Maths" },
  ],
};

const PdfSection = () => {
  const { section } = useParams();
  const subjects =
    SUBJECTS_BY_SECTION[section] || SUBJECTS_BY_SECTION.default;

  const renderSubjectCard = (subject, label) => (
    <div
      key={subject}
      className="
        border rounded-2xl bg-white shadow-sm
        p-5 sm:p-6
        flex flex-col gap-4
        items-start sm:items-start
      "
    >
      {/* Subject Title */}
      <p className="text-lg sm:text-xl font-bold text-gray-800">
        {label}
      </p>

      {/* E-Notes Button */}
      <Link
        to={`/chapters/${section}/${subject}`}
        className="
          w-full sm:w-auto
          text-center
          bg-blue-50 border border-blue-300 text-blue-700
          px-4 py-3
          rounded-lg
          text-sm font-bold
          !no-underline
          hover:bg-blue-100
        "
      >
        📘 E-Notes (Chapter-wise)
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="mt-4 ml-4 sm:mt-6 sm:ml-6">
        <Link
          to="/record/courses"
          className="
            !no-underline text-black
            text-xs sm:text-sm
            font-bold
            border
            hover:bg-gray-100
            px-3 py-2
            rounded
          "
        >
          ← Go back to Courses
        </Link>
      </div>

      {/* Page Content */}
      <div className="px-4 pt-20 pb-6 sm:p-6 max-w-5xl mx-auto">
        <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          {section.toUpperCase()} PDFs
        </p>

        {/* Subject Cards Grid */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          {subjects.map((sub) =>
            renderSubjectCard(sub.key, sub.label)
          )}
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </div>
    
  );
};

export default PdfSection;



