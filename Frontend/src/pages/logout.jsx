export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  window.location.href = "/";
};
