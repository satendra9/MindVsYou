import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Folder, FolderOpen } from "lucide-react";

const classes = ["class10th", "class12th"];

const SUBJECTS_BY_CLASS = {
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

const YEARS = [2025, 2024, 2023];



const PyqLayout = () => {
  const [openClass, setOpenClass] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { classname } = useParams();
  const [openYear, setOpenYear] = useState(null);
  

const toggleYear = (yearKey) => {
  setOpenYear(openYear === yearKey ? null : yearKey);
};

  useEffect(() => {
    if (classname) {
      setOpenClass(classname);
    }
  }, [classname]);

  useEffect(() => {
  // auto open sidebar on mobile
  if (window.innerWidth < 768) {
    setSidebarOpen(true);
  }
}, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* MOBILE HEADER */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <Link
          to="/record/courses"
          className="text-xs font-semibold border px-3 py-1.5 rounded hover:bg-gray-100 !no-underline"
        >
          ← Courses
        </Link>

        <p className="font-bold text-base text-gray-800">PYQs</p>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-gray-100"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0
          h-screen md:h-auto
          w-64 bg-white shadow-sm
          p-4 space-y-3
          overflow-y-auto
          transform transition-transform duration-300
          z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <p className="font-bold text-lg text-gray-800 mb-4 hidden md:block">
          Previous Year Questions
        </p>

        <Link
          to="/record/courses"
          className="hidden md:inline-block text-xs font-semibold border px-3 py-2 rounded mb-4 hover:bg-gray-100 !no-underline !text-green-800"
        >
          ← Back to Courses
        </Link>

        {classes.map((cls) => (
          <div key={cls} className="rounded-lg">
            <button
              onClick={() => setOpenClass(openClass === cls ? null : cls)}
              className={`
                flex justify-between items-center w-full
                px-3 py-3 font-semibold text-sm
                rounded-lg transition
                ${
                  openClass === cls
                    ? "bg-green-50 text-green-800"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              {cls}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openClass === cls ? "rotate-180" : ""
                }`}
              />
            </button>

            {openClass === cls && (
              <div className="mt-2 ml-4 pl-3 space-y-3 text-sm">
                {(SUBJECTS_BY_CLASS[cls] ||
                  SUBJECTS_BY_CLASS.default).map((sub) => (
                  <div key={sub.key}>
                    <p className="font-semibold text-gray-700">
                      {sub.label}
                    </p>

                    <div className="ml-3 mt-1 flex flex-col gap-1">
                      {YEARS.map((year) => {
  const yearKey = `${cls}-${sub.key}-${year}`;
  const isOpen = openYear === yearKey;

  return (
    <Link
      key={year}
      to={`/record/pyq/${cls}/${sub.key}/${year}`}
      onClick={() => {
        toggleYear(yearKey);
        setSidebarOpen(false); // close sidebar on mobile
      }}
      className="
         flex items-center gap-2
        px-2 py-1 rounded
        font-semibold
        transition
        !no-underline
        text-blue-600
        hover:text-green-600
        hover:bg-yellow-50
      "
    >
      {isOpen ? (
        <FolderOpen size={16} className="text-yellow-600" />
      ) : (
        <Folder size={16} className="text-yellow-600" />
      )}
      <span>{year}</span>
    </Link>
  );
})}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 flex">
        <div className="relative bg-white rounded-xl shadow-sm p-4 md:p-6 flex-1 overflow-hidden">
      
          {/* FADED LOGO (BACKGROUND) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/mindvsyou-logo.JPG"
              alt="Logo"
              className="
                w-40 sm:w-52 md:w-64
                opacity-10
                grayscale
                select-none
              "
            />
          </div>
      
          {/* ACTUAL CONTENT */}
          <div className="relative z-10">
            <Outlet />
          </div>
      
        </div>
      </main>
    </div>
  );
};

export default PyqLayout;



