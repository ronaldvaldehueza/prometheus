import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type ClientData = any;

const getAllClient = (): Promise<AxiosResponse<ClientData[]>> => {
    return http.get(`${BASE_URL}/api/client`);
};

const createClient = (data: ClientData): Promise<AxiosResponse<ClientData>> => {
    return http.post(`${BASE_URL}/api/client`, data);
};

const editClient = (id: string | number, data: ClientData): Promise<AxiosResponse<ClientData>> => {
    return http.put(`${BASE_URL}/api/client/${id}`, data);
};

const removeClient = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/client/${id}`);
};

const getCount = (): Promise<AxiosResponse<{ all: number }>> => {
    return http.get(`${BASE_URL}/api/count/client/all`);
};

const clientHTTPService = {
    getAllClient,
    createClient,
    editClient,
    removeClient,
    getCount
};

export default clientHTTPService;