import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/google-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      }
    );

    const data = await res.json();

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.user.role);
    sessionStorage.setItem("userId", data.user.id);
    sessionStorage.setItem("userEmail", data.user.email);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default UserLogin;
