import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

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
	async (err: AxiosError<IAPIResponseError>) => {
		interface APIResponse extends IAPIResponseSuccess {
			access_token: string;
		}

		const accessToken = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");

		// auto refresh access token if it is expired
		if (
			err.response?.status === 403 &&
			err.response.data.error ===
				"User is not logged in or access_token is expired" &&
			accessToken &&
			refreshToken
		) {
			const res = await API.get<APIResponse>("/auth/refresh", {
				headers: {
					"x-refresh": refreshToken,
				},
			});

			if (res.data.access_token) {
				localStorage.setItem("access_token", res.data.access_token);
				// resend the request with new access token
				const response = await API(err.config as AxiosRequestConfig);
				return Promise.resolve(response);
			}
		}

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
