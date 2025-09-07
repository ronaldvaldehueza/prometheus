import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type TeamData = any;

const getAllTeam = (): Promise<AxiosResponse<TeamData[]>> => {
    return http.get(`${BASE_URL}/api/team`);
};

const createTeam = (data: TeamData): Promise<AxiosResponse<TeamData>> => {
    return http.post(`${BASE_URL}/api/team`, data);
};

const editTeam = (id: string | number, data: TeamData): Promise<AxiosResponse<TeamData>> => {
    return http.put(`${BASE_URL}/api/team/${id}`, data);
};

const removeTeam = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/team/${id}`);
};

const teamHTTPService = {
    getAllTeam,
    createTeam,
    editTeam,
    removeTeam
};

export default teamHTTPService;