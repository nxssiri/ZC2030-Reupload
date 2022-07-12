import MainService from "./MainService";
import {getSession} from "next-auth/react";

// GET Request - Get Calculator Types
export const getCalculatorTypes = (data) => {
  return MainService.get("/api/calculators", {data});
};

// GET Request - Get Calculator Types
export const getPublicCalculatorTypes = () => {
  return MainService.get("/api/calculators/public");
};

export const getCalculatorTypesForUser = (userId) => {
  return MainService.get(`/api/calculators/user/${userId}/getTypes`);
};

// GET Request - Get Calculator Types
export const getCalculatorType = (type_id, data) => {
  return MainService.get(`/api/calculators/overview/${type_id}`, {data});
};

// POST Request - Save calculator Type
export const saveCalculatorType = (data) => {
  return MainService.post(`/api/calculators`, data);
};

// PUT Request - Update calculator Type
export const updateCalculatorType = (data) => {
  return MainService.put(`/api/calculators`, data);
};

// GET Request - Get Calculator Category
export const getCalculatorCategories = (type_id, data) => {
  return MainService.get(`/api/calculators/${type_id}`, {data});
};

// GET Request - Get Public Calculator Category
export const getPublicCalculatorCategories = (type_id, data) => {
  return MainService.get(`/api/calculators/public/${type_id}`, {data});
};

// POST Request - Save Calculator Category
export const saveCalculatorCategories = (type_id, data) => {
  return MainService.post(`/api/calculators/${type_id}`, data);
};

// POST Request - Create User Calculator
export const createUserCalculator = (typeId, data) => {
  return MainService.post(
    `/api/calculators/${typeId}/user/insertUsersIntoCalculator`,
    data
  );
};

// DELETE Request - Delete Calculator Category
export const deleteCalculatorCategory = (type_id, categoryId, data) => {
  return MainService.delete(`/api/calculators/${type_id}/${categoryId}`, {data});
};

export const deleteCalculatorInput = (type_id, categoryId, inputId) => {
  return MainService.delete(
    `/api/calculators/${type_id}/${categoryId}/input/${inputId}`
  );
};

// PUT Request - Update Calculator Category
export const updateCalculatorCategories = (type_id, data) => {
  return MainService.put(`/api/calculators/${type_id}`, data);
};

// GET Request - Get Calculator Inputs
export const getCalculatorInputs = (type_id, category_id, data) => {
  return MainService.get(`/api/calculators/${type_id}/${category_id}`, {data});
};

// GET Request - Get Public Calculator Inputs
export const getPublicCalculatorInputs = (type_id, category_id) => {
  return MainService.get(`/api/calculators/public/${type_id}/${category_id}`);
};

// POST Request - Save Calculator Inputs
export const saveCalculatorInputs = (type_id, category_id, data) => {
  return MainService.post(`/api/calculators/${type_id}/${category_id}`, data);
};

// DELETE Request - Delete Calculator Inputs
export const deleteCalculatorInputs = (type_id, category_id, data) => {
  return MainService.delete(`/api/calculators/${type_id}/${category_id}`, {
    data,
  });
};

// PUT Request - Update Calculator Inputs
export const updateCalculatorInputs = (type_id, category_id, data) => {
  return MainService.put(`/api/calculators/${type_id}/${category_id}`, data);
};

export const getCalculatorUsers = (type_id, data) => {
  return MainService.get(`/api/calculators/getUsers/${type_id}`, {data});
};

// POST Request - Save calculator result
export const saveCalculatorResult = (type_id, category_id, input_id, data) => {
  return MainService.post(
    `/api/calculators/${type_id}/${category_id}/result/${input_id}`,
    data
  );
};

// GET Request - Get User Category Progress
export const getUserCategoryProgress = (userId, categoryId) => {
  return MainService.get(
    `/api/calculators/user/${userId}/${categoryId}/uniqueCompletedCount`
  );
};

export const deleteCalculatorType = (idToDelete) => {
  return MainService.delete(`/api/calculators/${idToDelete}`);
};

export const deleteUsersCalculator = (idToDelete, typeId) => {
  return MainService.delete(
    `/api/calculators/${typeId}/user/${idToDelete}`,
    {}
  );
};

export const getLogsByUser = (userId, data) => {
  return MainService.get(`/api/calculators/user/${userId}/logs`, {data});
};

export const getUserByEmail = (email) => {
  return MainService.get(`/api/users/${email}/getByEmail/`);
};
