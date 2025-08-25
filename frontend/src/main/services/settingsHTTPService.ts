import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
import { AxiosResponse } from "axios";

// Define a proper interface when the data shape is known
type SettingsData = any;

const getSystemSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/syssettings`);
};

const getDashboardSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/dashboardsettings`);
};

const getNotificationSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/notificationsettings`);
};

const getEmailSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/emailsettings`);
};

const getEmailTemplateettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/emailtemplatesettings`);
};

const getFooterSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/footersettings`);
};

const getHeaderSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/headersettings`);
};

const getLocalisationSettings = (): Promise<AxiosResponse<SettingsData>> => {
    return http.get(`${BASE_URL}/api/localisationsettings`);
};

const editDashboardSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/dashboardsettings/${id}`, data);
};

const editSystemSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/systemsettings/${id}`, data);
};

const editEmailSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/emailsettings/${id}`, data);
};

const editLocalisationSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/localisationsettings/${id}`, data);
};

const editFooterSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/footersettings/${id}`, data);
};

const editHeaderSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/headersettings/${id}`, data);
};

const editNotificationsSettings = (id: string | number, data: SettingsData): Promise<AxiosResponse<SettingsData>> => {
    return http.put(`${BASE_URL}/api/edit/notificationsettings/${id}`, data);
};

const restoreSystemSettings = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/restore/syssettings/${id}`);
};

const restoreDashboardettings = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/restore/dashboard/${id}`);
};

const restoreHeaderettings = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/restore/header/${id}`);
};

const restoreFooterSettings = (id: string | number): Promise<AxiosResponse<any>> => {
    return http.get(`${BASE_URL}/api/restore/footer/${id}`);
};

const settingsHTTPService = {
    restoreDashboardettings,
    restoreHeaderettings,
    restoreFooterSettings,
    restoreSystemSettings,
    editSystemSettings,
    editEmailSettings,
    editLocalisationSettings,
    editFooterSettings,
    editHeaderSettings,
    editNotificationsSettings,
    getSystemSettings,
    getLocalisationSettings,
    getHeaderSettings,
    getFooterSettings,
    getEmailTemplateettings,
    getEmailSettings,
    getNotificationSettings,
    getDashboardSettings,
    editDashboardSettings
};

export default settingsHTTPService;