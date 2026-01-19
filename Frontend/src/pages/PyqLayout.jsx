import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect } from "react";

const classes = ["class8th", "class9th", "class10th", "class11th", "class12th"];

const PyqLayout = () => {
  const [openClass, setOpenClass] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { className } = useParams();

  useEffect(() => {
    if (className) {
      setOpenClass(className);
    }
  }, [className]);

  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
        <Link
    to="/record/courses"
    className="text-xs font-bold border px-3 py-1 rounded !no-underline"
  >
    ← Courses
  </Link>
        <p className="font-bold text-lg">PYQs</p>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto
          w-64 bg-white border-r p-4 space-y-2
          transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <p className="font-bold text-lg mb-4 hidden md:block">PYQs</p>
        <Link
  to="/record/courses"
  className="hidden md:inline-block text-xs font-bold border px-3 py-2 rounded mb-4 hover:bg-gray-100 !no-underline"
>
  ← Go back to Courses
</Link>

        {classes.map((cls) => (
          <div key={cls}>
            <button
              onClick={() => setOpenClass(openClass === cls ? null : cls)}
              className="flex justify-between items-center w-full font-semibold px-2 py-2"
            >
              {cls.toUpperCase()}
              <ChevronDown
                className={`transition-transform ${
                  openClass === cls ? "rotate-180" : ""
                }`}
              />
            </button>

            {openClass === cls && (
              <div className="ml-4 flex flex-col gap-2 text-sm">
                <Link
                  to={`/record/pyq/${cls}/science`}
                  className="hover:text-blue-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  Science
                </Link>
                <Link
                  to={`/record/pyq/${cls}/maths`}
                  className="hover:text-blue-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  Maths
                </Link>
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 md:ml-0">
        <Outlet />
      </main>
      
    </div>
    
    </>
  );
};

export default PyqLayout;

