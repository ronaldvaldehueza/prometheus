import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type MyTaskData = any;

const getAllMyTask = (): Promise<AxiosResponse<MyTaskData[]>> => {
    return http.get(`${BASE_URL}/api/mytask`);
};

const createMyTask = (data: MyTaskData): Promise<AxiosResponse<MyTaskData>> => {
    return http.post(`${BASE_URL}/api/mytask`, data);
};

const editMyTask = (id: string | number, data: MyTaskData): Promise<AxiosResponse<MyTaskData>> => {
    return http.put(`${BASE_URL}/api/mytask/${id}`, data);
};

const removeMyTask = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/mytask/${id}`);
};

const getTodo = (): Promise<AxiosResponse<{ todo: number }>> => {
    return http.get(`${BASE_URL}/api/count/mytask/todo`);
};

const getInprogress = (): Promise<AxiosResponse<{ inprogress: number }>> => {
    return http.get(`${BASE_URL}/api/count/mytask/inprogress`);
};

const getinreview = (): Promise<AxiosResponse<{ inreview: number }>> => {
    return http.get(`${BASE_URL}/api/count/mytask/inreview`);
};

const getCompleted = (): Promise<AxiosResponse<{ completed: number }>> => {
    return http.get(`${BASE_URL}/api/count/mytask/completed`);
};

const mytaskHTTPService = {
    getTodo,
    getinreview,
    getCompleted,
    getInprogress,
    getAllMyTask,
    createMyTask,
    editMyTask,
    removeMyTask
};

export default mytaskHTTPService;