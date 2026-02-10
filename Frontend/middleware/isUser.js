const isUser = () => {
  return sessionStorage.getItem("role") === "user";
};

export default isUser;
