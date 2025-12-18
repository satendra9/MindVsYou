import React from "react";
import { Link } from "react-router-dom";

export default function EmailSuccess() {
  return (
    <>
    <div className=" bg-gray-100">
        <div className="bg-cyan-300 hover:bg-cyan-500 border-2 px-2 py-2 text-black font-medium">
            <button className="text-2xl font-semibold text-green-600 ml-4"><Link to="/"
            className="text-green-600 no-underline hover:underline">GO BACK TO SITE!!</Link></button>
        </div>
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-2xl font-semibold text-green-600">
          Email submitted successfully!
        </h1>
      </div>
      <div>
      </div>
      
    </div>
    
    
</>
  );
}