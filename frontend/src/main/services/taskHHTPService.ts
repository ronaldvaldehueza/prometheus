import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type TaskData = any;

const getAllTask = (): Promise<AxiosResponse<TaskData[]>> => {
    return http.get(`${BASE_URL}/api/task`);
};

const getAllMyTask = (user: any): Promise<AxiosResponse<TaskData[]>> => {
    return http.get(`${BASE_URL}/api/mytask/${user}`);
};

const getTopTask = (): Promise<AxiosResponse<TaskData[]>> => {
    return http.get(`${BASE_URL}/api/count/task/top`);
};

const createTask = (data: TaskData): Promise<AxiosResponse<TaskData>> => {
    return http.post(`${BASE_URL}/api/task`, data);
};

const editTask = (id: string | number, data: TaskData): Promise<AxiosResponse<TaskData>> => {
    return http.put(`${BASE_URL}/api/task/${id}`, data);
};

const removeTask = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/task/${id}`);
};

const getTodo = (): Promise<AxiosResponse<{ count: number }>> => {
    return http.get(`${BASE_URL}/api/count/task/todo`);
};

const getInprogress = (): Promise<AxiosResponse<{ count: number }>> => {
    return http.get(`${BASE_URL}/api/count/task/inprogress`);
};

const getinreview = (): Promise<AxiosResponse<{ count: number }>> => {
    return http.get(`${BASE_URL}/api/count/task/inreview`);
};

const getCompleted = (): Promise<AxiosResponse<{ count: number }>> => {
    return http.get(`${BASE_URL}/api/count/task/completed`);
};

const getCount = (): Promise<AxiosResponse<{ all: number }>> => {
    return http.get(`${BASE_URL}/api/count/task/all`);
};

const taskHHTPService = {
    getTodo,
    getinreview,
    getCompleted,
    getInprogress,
    getAllTask,
    createTask,
    editTask,
    removeTask,
    getTopTask,
    getAllMyTask,
    getCount
};

export default taskHHTPService;