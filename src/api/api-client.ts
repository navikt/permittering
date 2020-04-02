import axios from 'axios';
import { redirectTilLogin } from '../App/LoggInn/LoggInn';

const api = axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 30000,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            redirectTilLogin();
        } else if (error.response.status === 403) {
            // redirectToIngenTilgang();
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;
