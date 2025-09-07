import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type NoteData = any;

const getAllNote = (): Promise<AxiosResponse<NoteData[]>> => {
    return http.get(`${BASE_URL}/api/note`);
};

const createNote = (data: NoteData): Promise<AxiosResponse<NoteData>> => {
    return http.post(`${BASE_URL}/api/note`, data);
};

const editNote = (id: string | number, data: NoteData): Promise<AxiosResponse<NoteData>> => {
    return http.put(`${BASE_URL}/api/note/${id}`, data);
};

const removeNote = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.delete(`${BASE_URL}/api/note/${id}`);
};

const noteHTTPService = {
    getAllNote,
    createNote,
    editNote,
    removeNote
};

export default noteHTTPService;