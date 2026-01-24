import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/teacher-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      sessionStorage.setItem("token", data.token);

      // ✅ DECODE TOKEN → STORE ROLE (SYNC WITH BACKEND)
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      sessionStorage.setItem("role", decoded.role.toLowerCase());

      navigate("/");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* COLUMN WRAPPER */}
      <div className="w-96">

        <div className="text-sm font-bold text-2xl">
          <p className="text-sm text-2xl ml-18 text-emerald-950">Welcome to MindVsYou Login Page</p>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Teacher Login</h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4">
            Login
          </button>
        </form>

        {/* REGISTER TEXT BELOW FORM */}
        <p className="text-center mt-4 text-sm">
          New teacher?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/api/auth/teacher-register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
