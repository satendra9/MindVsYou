const GetAppSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-4xl md:text-5xl font-extrabold text-[#3c4852]">
            Get the MindVsYou Learning app
          </p>

          <p className="mt-4 text-gray-600 text-base max-w-md font-medium">
            Download lessons and learn anytime, anywhere with the MindVsYou ChatBot App
          </p>

          <div className="mt-6 flex gap-3">
  <a
  href="https://wa.me/7905574323?text=Hi"
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex items-center gap-2
    bg-gradient-to-r from-purple-400 to-purple-500
    hover:from-purple-500 hover:to-purple-600
    text-white font-semibold
    px-7 py-3
    rounded-full
    shadow-lg shadow-purple-300/40
    transition-all duration-300
    hover:scale-105
    active:scale-95
    !no-underline
  "
>
  🤖 Go to MindVsYou ChatBot
</a>
</div>


         
        </div>

        {/* Right Images */}
        <div className="relative flex justify-center">
          <img
            src="/Get Learning App.JPG"
            alt="MindVsYou App Android"
            className="h-[420px] z-10 rounded-2xl"
          />
          
        </div>
      </div>
    </section>
  );
};

export default GetAppSection;
