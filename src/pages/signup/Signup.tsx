import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISignupPayload, signupHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useUpdateObjectState from "../../hooks/useUpdateObjectState";

/**
 * Signup page
 * @returns JSX.Element
 */
const Signup: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	/**
	 * This state will contain formData which will be posted to backend
	 * when user clicks `signup` button
	 * @constant
	 * @author aayushchugh
	 */
	const [formData, setFormData] = useState<ISignupPayload>({
		username: "",
		email: "",
		password: "",
		cpassword: "",
	});

	const updateFormData = useUpdateObjectState<ISignupPayload>(setFormData);

	/**
	 * This function will be called when form is submitted
	 * @param e form event
	 *
	 * @author aayushchugh
	 */
	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(signupHandler(formData));
			navigate(`/verification?email=${formData.email}`);

			// TODO: show success message on UI
		} catch (err) {
			// TODO: show error on UI
		}
	};

	/*
	  TODO: Add validation for following fields
	- username
		- required
		- should not be shorter than 3 characters
		- should not be longer than 50 characters
		
	- email
		- required
		- should be a valid email

	- password
		- required
		- minimum length of 6 characters

	- cpassword
		- required
		- minimum length of 6 characters
		- password and cpassword should be same
	 */
	return (
		<main>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="username">Username: </label>
					<input
						id="username"
						type="text"
						placeholder="multiemail"
						className="border-2"
						value={formData.username}
						onChange={e => updateFormData("username", e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						id="email"
						type="email"
						placeholder="info@multiemail.us"
						className="border-2"
						value={formData.email}
						onChange={e => updateFormData("email", e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						id="password"
						type="password"
						placeholder="strongpassword"
						className="border-2"
						value={formData.password}
						onChange={e => updateFormData("password", e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="cpassword">Confirm Password: </label>
					<input
						id="cpassword"
						type="password"
						placeholder="strongpassword"
						className="border-2"
						value={formData.cpassword}
						onChange={e => updateFormData("cpassword", e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="bg-primary text-white py-1 px-2 rounded"
				>
					Signup
				</button>
			</form>
		</main>
	);
};

export default Signup;
