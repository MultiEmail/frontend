import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Use this `API` instead of `axios` for api requests
 * throughout the code
 *
 * This is instance of `axios` with custom config
 * and interceptors
 *
 * @constant
 * @author aayushchugh
 */
const API: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 10000,
});

// TODO: Add request interceptor to add authorization headers in every request

/**
 * This interceptor will format the response and error from API
 *
 * You will get formatted response and error when you use `API` for sending
 * requests to API
 * @author aayushchugh
 */
API.interceptors.response.use(
	(res: AxiosResponse) => {
		return Promise.resolve(res);
	},
	(err: AxiosError) => {
		const formattedErr = {
			status: err.response?.status,
			statusText: err.response?.statusText,
			code: err.code,
			data: err.response?.data,
		};

		return Promise.reject(formattedErr);
	}
);

/**
 * This type contains data which will be sent to API on success
 *
 * extend this interface when you want to add more properties to APIResponse
 *
 * @example
 * ```tsx
 * interface IGetAllUsersResponse extends IAPIResponseSuccess {
 *    records: User[]
 * }
 * ```
 * @author aayushchugh
 */
export interface IAPIResponseSuccess {
	message: string;
}

/**
 * This type contains data which will be sent by API on error
 *
 * @author aayushchugh
 */
export interface IAPIResponseError {
	error: string;
}

export default API;
