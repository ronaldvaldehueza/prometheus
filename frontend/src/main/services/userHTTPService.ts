import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define proper interfaces when the data shapes are known
type UserData = any;
type LoginData = any;

const getAllUser = (): Promise<AxiosResponse<UserData[]>> => {
    return http.get(`${BASE_URL}/api/user`);
};

const createUser = (data: UserData): Promise<AxiosResponse<UserData>> => {
    return http.post(`${BASE_URL}/api/user`, data);
};

const editUser = (id: string | number, data: UserData): Promise<AxiosResponse<UserData>> => {
    return http.put(`${BASE_URL}/api/user/${id}`, data);
};

const removeUser = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/user/${id}`);
};

const getCount = (): Promise<AxiosResponse<{ all: number }>> => {
    return http.get(`${BASE_URL}/api/count/user/all`);
};

const login = (data: LoginData): Promise<AxiosResponse<any>> => {
    return http.post(`${BASE_URL}/api/user/login`, data);
};

const userHTTPService = {
    getAllUser,
    createUser,
    editUser,
    removeUser,
    getCount,
    login
};

export default userHTTPService;