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

const TestLayout = () => {
  const [openClass, setOpenClass] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { classname, subject } = useParams();

  useEffect(() => {
    if (classname) {
      setOpenClass(classname);
    }
  }, [classname]);

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

        <p className="font-bold text-base text-gray-800">Tests</p>

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
          Test Papers
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
              {cls.replace("class", "class ").toLowerCase()}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openClass === cls ? "rotate-180" : ""
                }`}
              />
            </button>

            {openClass === cls && (
              <div className="mt-2 ml-4 pl-3 flex flex-col gap-2 text-sm">
                {(SUBJECTS_BY_CLASS[cls] || SUBJECTS_BY_CLASS.default).map((sub) => {
  const isActive = subject === sub.key;

  return (
    <Link
      key={sub.key}
      to={`/record/test/${cls}/${sub.key}`}
      onClick={() => setSidebarOpen(false)}
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
      {isActive ? (
        <FolderOpen size={16} className="text-yellow-500" />
      ) : (
        <Folder size={16} className="text-yellow-400" />
      )}

      <span>{sub.label}</span>
    </Link>
  );
})}

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
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TestLayout;

