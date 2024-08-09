import { commonApi } from "./commonApi";
import base_url from "./server_url";

export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}

export const addTask = async (data,header) => {
    return await commonApi("POST", `${base_url}/add-task`,data,header)
}
export const getTask = async (header) => {
    return await commonApi("GET", `${base_url}/get-task`,"",header)
}

export const updateTask = async (data,header) => {
    return await commonApi("PUT", `${base_url}/update-task`, data,header)
}

export const deleteTask = async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/delete-task/${id}`,{},header)
}
