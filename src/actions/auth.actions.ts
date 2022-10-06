import API, { IAPIResponseError, IAPIResponseSuccess } from "../utils/api.util";

export interface ISignupPayload {
	username: string;
	email: string;
	password: string;
	cpassword: string;
}

export const signupHandler = (payload: ISignupPayload) => {
	return () => {
		return API.post<IAPIResponseSuccess | IAPIResponseError>(
			"/auth/signup",
			payload
		);
	};
};
