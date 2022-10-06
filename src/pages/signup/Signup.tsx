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

  const errors = () => {
    const errors: Partial<ISignupPayload> = {};

	const { username, email, cpassword, password } = formData;

    if (username.length > 0 && username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    } else if (username.length > 50) {
      errors.username = "Username must be at most 50 characters long";
    }

   	if (email.length > 0 &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      errors.email = "Invalid email address";
    }

    if (cpassword.length > 0 && cpassword !== password) {
      errors.cpassword = "Password and confirm password must be the same";
	}
	  
	if (password.length > 0 && cpassword !== password) {
      errors.cpassword = "Password and confirm password must be the same";
    }

    if (cpassword.length > 0 && cpassword.length < 6) {
      errors.cpassword = "Confirm password must be at least 6 characters long";
    }

 	if (password.length > 0 && password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
	}

    return errors;
	};
	
	const formInvalid = Object.keys(errors()).length > 0 || Object.values(formData).some(str => str === "")

	return (
		<main>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="username">Username (*): </label>
					<input
						id="username"
						type="text"
						placeholder="multiemail"
						className="border-2"
						value={formData.username}
						onChange={e => updateFormData("username", e.target.value)}
					/>
						{errors().username}
				</div>
				<div>
					<label htmlFor="email">Email (*): </label>
					<input
						id="email"
						type="email"
						placeholder="info@multiemail.us"
						className="border-2"
						value={formData.email}
						onChange={e => updateFormData("email", e.target.value)}
					/>
					{errors().email}
				</div>
				<div>
					<label htmlFor="password">Password (*): </label>
					<input
						id="password"
						type="password"
						placeholder="strongpassword"
						className="border-2"
						value={formData.password}
						onChange={e => updateFormData("password", e.target.value)}
					/>
					{errors().password}
				</div>
				<div>
					<label htmlFor="cpassword">Confirm Password (*): </label>
					<input
						id="cpassword"
						type="password"
						placeholder="strongpassword"
						className="border-2"
						value={formData.cpassword}
						onChange={e => updateFormData("cpassword", e.target.value)}
					/>
					{errors().cpassword}
				</div>

				<button
					type="submit"
					disabled={formInvalid}
					className="bg-primary text-white py-1 px-2 rounded"
				>
					Signup
				</button>
			</form>
		</main>
	);
};

export default Signup;
