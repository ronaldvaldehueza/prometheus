import api from '../../common/http';
import BASE_URL from '../../main/urls/urls';

api.defaults.baseURL = BASE_URL;
api.defaults.headers.common["Content-Type"] = "application/json";

export default api;
