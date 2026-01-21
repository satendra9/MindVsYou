const isTeacher = () => {
  return sessionStorage.getItem("role") === "teacher";
};

export default isTeacher;
