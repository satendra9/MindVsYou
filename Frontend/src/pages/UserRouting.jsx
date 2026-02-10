import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  return sessionStorage.getItem("role") === "user" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default UserRoute;
