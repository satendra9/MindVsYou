import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const SelectGoal = () => {
  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch goals dynamically
 const [isFirstLoad, setIsFirstLoad] = useState(true);

const fetchGoals = async (query = "") => {
  try {
    if (isFirstLoad) setLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/record/goals?search=${query}`
    );
    setGoals(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    setIsFirstLoad(false);
  }
};

useEffect(() => {
  const delay = setTimeout(() => {
    fetchGoals(search);
  }, 400);

  return () => clearTimeout(delay);
}, [search]);


  // Live search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const normalize = (title) =>
  title.toLowerCase().replace(/\s+/g, "");

const getRoute = (goal) => {
  const title = goal.title.toLowerCase();

  if (title.includes("pyq")) return "/record/pyq";
  if (title.includes("test")) return "/record/test";

  return `/record/${normalize(goal.title)}`;
};


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Heading */}
      <p className="font-bold text-gray-700 text-2xl sm:text-3xl">
        Select your goal / exam
      </p>

      <p className="mt-2 text-xs sm:text-sm text-gray-700 font-medium">
        <span className="text-green-600 font-semibold">Various</span> exams
        available for your preparation
      </p>

      {/* Search */}
      <div className="relative mt-4 sm:mt-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Type the goal / exam you’re preparing for"
          className="w-full rounded-lg border border-gray-200 py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Popular goals */}
      <p className="mt-8 sm:mt-12 mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-700">
        Popular goals
      </p>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading goals...</p>
      ) : goals.length === 0 ? (
        <p className="text-gray-500 text-sm">No goals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="group rounded-xl border border-gray-200 p-5 sm:p-8 text-center hover:bg-gray-100 transition"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                {goal.icon}
              </div>

              <p className="font-semibold text-gray-800 group-hover:text-green-600 text-sm sm:text-base">
                {goal.title}
              </p>

              <Link
              to={getRoute(goal)}
              className="inline-block mt-3 sm:mt-4 bg-orange-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs font-bold !text-gray-800 !no-underline"
              >
              STUDY MATERIAL
              </Link>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SelectGoal;
