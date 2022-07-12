import MainService from "./MainService";

// GET Request - Get all users
export const getUserData = () => {
  return MainService.get("/api/users");
};

// GET Request - Get all admins
export const getAdminData = () => {
  return MainService.get("/api/admin");
};

// PUT Request - Set a new admin
export const updateRole = (data) => {
  return MainService.put(`/api/admin/`,  data);
};

// DELETE Request - Set a new admin
export const removeUser = (data) => {
  return MainService.delete(`/api/admin/`, {data});
};

// PUT Request - Edit user data
export const updateUser = (data) => {
  return MainService.put(`/api/users/`,  data);
};
