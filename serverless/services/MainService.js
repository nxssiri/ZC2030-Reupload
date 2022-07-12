import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
});
