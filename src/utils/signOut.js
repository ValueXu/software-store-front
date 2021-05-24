const clearToken = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token")
};
export { clearToken };
