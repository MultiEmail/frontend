import { AxiosError } from "axios";
import API, { IAPIResponseError, IAPIResponseSuccess } from "../utils/api.util";

export interface ISignupPayload {
	username: string;
	email: string;
	password: string;
	cpassword: string;
	terms: boolean;
	marketting: boolean;
}

/**
 * This function will send POST request to `/auth/signup` route
 * @param payload for post request
 *
 * @author aayushchugh
 */
export const signupHandler = (payload: ISignupPayload) => {
	return async () => {

		interface APIResponse extends IAPIResponseSuccess {
			message: string;
		}

		try {
			const response = await API.post<APIResponse>("/auth/signup", payload);
			return Promise.resolve(response);
		}
		catch (error) {
			return Promise.reject(error as AxiosError<IAPIResponseError>);
		}
	};
};

export interface ILoginPayload {
	email: string;
	password: string;
}

/**
 * This function will send request to `/auth/login` route and than
 * set `access_token` and `refresh_token` from response in `localStorage`
 * @param payload for post request
 *
 * @author aayushchugh
 */
export const loginHandler = (payload: ILoginPayload) => {
	return async () => {
		interface APIResponse extends IAPIResponseSuccess {
			access_token: string;
			refresh_token: string;
		}

		try {
			// make API request to `/auth/login` route
			const res = await API.post<APIResponse>("/auth/login", payload);

			// save access and refresh token to local storage
			localStorage.setItem("access_token", res.data.access_token);
			localStorage.setItem("refresh_token", res.data.refresh_token);

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};


export interface IVerificationPayload {
	verificationCode: Number;
}

/**
 * This function will send request to `/auth/verify` route
 * @param payload for post request
 * @author is-it-ayush
 */

export const verifyHandler = (payload: IVerificationPayload, token: String) => {
	return async () => {
		interface APIResponse extends IAPIResponseSuccess {
			message: string;
		}

		try {
			const res = await API.get<APIResponse>(`/auth/verify/${payload.verificationCode}`, {
				headers: {
					"Authorization": `Bearer ${token}`,
				}
			});
			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
}
