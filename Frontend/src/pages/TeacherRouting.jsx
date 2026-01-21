import { Navigate } from "react-router-dom";

const TeacherRoute = ({ children }) => {
  return sessionStorage.getItem("role") === "teacher" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default TeacherRoute;
