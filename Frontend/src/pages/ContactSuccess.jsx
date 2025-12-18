const ContactSuccess = () => {
    return (
<>
<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
  <div class="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
    

    <div class="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-12 w-12 text-white" 
           viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h1 class="text-2xl font-semibold text-gray-800 mb-2">
      Contact Submitted Successfully
    </h1>
    <p class="text-gray-600 mb-6">
      Thank you for reaching out to us. We will get back to you shortly.
    </p>
    <div class="flex flex-col gap-3">
      <a href="/" 
         class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Back to Home
      </a>

      <a href="/record/contact" 
         class="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
        Submit Another
      </a>
    </div>
  </div>
</div>
</>
    )
}
export default ContactSuccess;