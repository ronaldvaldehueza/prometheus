import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type ContractData = any;

const getAllContract = (): Promise<AxiosResponse<ContractData[]>> => {
    return http.get(`${BASE_URL}/api/contract`);
};

const createContract = (data: ContractData): Promise<AxiosResponse<ContractData>> => {
    return http.post(`${BASE_URL}/api/contract`, data);
};

const editContract = (id: string | number, data: ContractData): Promise<AxiosResponse<ContractData>> => {
    return http.put(`${BASE_URL}/api/contract/${id}`, data);
};

const removeContract = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/contract/${id}`);
};

const contractHTTPService = {
    getAllContract,
    createContract,
    editContract,
    removeContract
};

export default contractHTTPService;