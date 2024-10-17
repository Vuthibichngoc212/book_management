import { API_STATUS_CODES } from '@/constants/api.constant';

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import axios from 'axios';

/** Setup an API instance */
const api = axios.create({
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	}
});
/**
 * Add authorization headers to API calls
 * @param {InternalAxiosRequestConfig} requestConfig
 */
const authInterceptor = (requestConfig: InternalAxiosRequestConfig) => {
	const token = Cookies.get('token');

	if (token) {
		requestConfig.headers['Cookie'] = token;
	}

	return requestConfig;
};
const errorRequestInterceptor = (error: any) => {
	Promise.reject(error);
};
/** Add responseInterceptor */
const responseInterceptor = (response: AxiosResponse) => {
	if (response.config) {
		return response.data;
	}
	return response;
};

/** Add errorInterceptor */
const errorInterceptor = async (axiosError: AxiosError) => {
	if (axiosError?.response?.status) {
		switch (axiosError.response?.status) {
			case API_STATUS_CODES.unauthorized:
				break;
			case API_STATUS_CODES.forbidden:
				// window.location.assign('/');
				break;
			case API_STATUS_CODES.notFound:
				// window.location.assign('/');
				break;
			case 429:
				break;
			case 500:
				break;
			default:
				break;
		}
	}
	throw axiosError?.response?.data;
};

/** Add interceptor */
api.interceptors.request.use(authInterceptor, errorRequestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
