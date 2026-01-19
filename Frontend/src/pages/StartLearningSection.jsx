const stats = [
  {
    id: 1,
    title: "Exam categories",
    value: "60+",
    accent: "text-green-500",
    bg: "bg-[#FFF4E5]",
    icon: "📘",
  },
  {
    id: 2,
    title: "Educators",
    value: "14k+",
    accent: "text-green-500",
    bg: "bg-[#EAF2FF]",
    icon: "👤",
  },
  {
    id: 3,
    title: "Daily live classes",
    value: "1.5k+",
    accent: "text-green-500",
    bg: "bg-[#FFEAEA]",
    icon: "🎥",
  },
  {
    id: 4,
    title: "Video lessons",
    value: "1M+",
    accent: "text-green-500",
    bg: "bg-[#FFF2D9]",
    icon: "📺",
  },
  {
    id: 5,
    title: "Mins. watched",
    value: "3.2B+",
    accent: "text-green-500",
    bg: "bg-[#EDF2F7]",
    icon: "👁️",
  },
];

const StartLearningSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-4xl md:text-5xl font-bold text-[#3c4852]">
            Start learning with <br /> MindVsYou Coaching
          </p>

          <p className="mt-4 text-gray-600 max-w-md">
            Get unlimited access to structured courses & doubt clearing sessions
          </p>

          <button className="mt-8 bg-[#00b894] hover:bg-[#00a37f] text-white font-semibold px-6 py-3 rounded transition">
            Start learning
          </button>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div
                className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartLearningSection;
