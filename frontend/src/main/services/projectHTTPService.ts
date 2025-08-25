import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type ProjectData = any;

const getAllProject = (): Promise<AxiosResponse<ProjectData[]>> => {
    return http.get(`${BASE_URL}/api/project`);
};

const getCount = (): Promise<AxiosResponse<{ all: number }>> => {
    return http.get(`${BASE_URL}/api/count/project/all`);
};

const getTopProject = (): Promise<AxiosResponse<ProjectData[]>> => {
    return http.get(`${BASE_URL}/api/count/project/top`);
};

const findprojectByStatus = (): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/findprojectbystatus`);
};

const createProject = (data: ProjectData): Promise<AxiosResponse<ProjectData>> => {
    return http.post(`${BASE_URL}/api/project`, data);
};

const editProject = (id: string | number, data: ProjectData): Promise<AxiosResponse<ProjectData>> => {
    return http.put(`${BASE_URL}/api/project/${id}`, data);
};

const removeProject = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/project/${id}`);
};

const searchProject = (title: string): Promise<AxiosResponse<ProjectData[]>> => {
    return http.get(`${BASE_URL}/api/project/search/${title}`);
};

const copyProject = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/project/copy/${id}`);
};

const uploadFile = (data: FormData): Promise<AxiosResponse<any>> => {
    return http.post(`${BASE_URL}/api/addfile`, data);
};

const filterProject = (data: any): Promise<AxiosResponse<ProjectData[]>> => {
    return http.post(`${BASE_URL}/api/project/filterproject`, data);
};

const getTodo = (): Promise<AxiosResponse<{ todo: number }>> => {
    return http.get(`${BASE_URL}/api/count/project/todo`);
};

const getInprogress = (): Promise<AxiosResponse<{ inprogress: number }>> => {
    return http.get(`${BASE_URL}/api/count/project/inprogress`);
};

const getDone = (): Promise<AxiosResponse<{ done: number }>> => {
    return http.get(`${BASE_URL}/api/count/project/done`);
};

const getBlocked = (): Promise<AxiosResponse<{ blocked: number }>> => {
    return http.get(`${BASE_URL}/api/count/project/blocked`);
};

const projectHTTPService = {
    getTodo,
    getInprogress,
    getDone,
    getBlocked,
    getAllProject,
    createProject,
    editProject,
    removeProject,
    copyProject,
    searchProject,
    uploadFile,
    filterProject,
    findprojectByStatus,
    getTopProject,
    getCount
};

export default projectHTTPService;