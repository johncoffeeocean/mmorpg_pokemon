const config = {
  serverApi: "http://localhost:5000/api/",

  setUserToken(token) {
    localStorage.setItem("token", token);
  },

  getUserToken() {
    return localStorage.getItem("token");
  },

  setUserInfo(userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  },

  setSocketInfo(socketInfo) {
    localStorage.setItem("socketInfo", JSON.stringify(socketInfo));
  },

  getSocketInfo() {
    return JSON.parse(localStorage.getItem("socketInfo"));
  },
};

export default config;
