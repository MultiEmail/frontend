import { Dispatch, SetStateAction } from "react";

/**
 * This hook is used to update a single property of object state
 *
 * It takes a React state setter function and returns a function that takes a key and a value and
 * updates the state with the new value
 *
 * @typeParam T - Type of state
 * @param setState setState function that will update the state you want
 *
 * @returns A function that takes a key and a value and updates the state with the new value.
 *
 * @example
 * ```tsx
 *  import { useState } from "react";
 *  import useUpdateObjectState from '../hooks/useUpdateObjectState';
 *
 *  interface FormData {
 *     name: string;
 *     email: string
 *  }
 *
 *  const [formData, setFormData] = useState<FormData>({})
 *  const updateForm = useUpdateObjectState<FormData>(setFormData)
 *
 *  return (
 *      <form>
 *        <input onChange={(e) => updateForm("name", e.target.value)} />
 *        <input onChange={(e) => updateForm("email", e.target.value)} />
 *      </form>
 * )
 * ```
 * @author aayushchugh
 */
const useUpdateObjectState = <T>(setState: Dispatch<SetStateAction<T>>) => {
	/**
	 * This function will update the key of state object that
	 * is passed
	 *
	 * @param key which key should be updated
	 * @param value what value should be set for the key
	 *
	 * @example
	 *
	 *  ```tsx
	 *  import { useState } from "react";
	 *  import useUpdateObjectState from '../hooks/useUpdateObjectState';
	 *
	 *  interface FormData {
	 *     name: string;
	 *     email: string
	 *  }
	 *
	 *  const [formData, setFormData] = useState<FormData>({})
	 *  const updateForm = useUpdateObjectState<FormData>(setFormData)
	 *
	 *  return (
	 *      <form>
	 *        <input onChange={(e) => updateForm("name", e.target.value)} />
	 *        <input onChange={(e) => updateForm("email", e.target.value)} />
	 *      </form>
	 * )
	 * ```
	 *
	 * @author aayushchugh
	 */
	return (key: keyof T, value: any) => {
		setState(prevState => {
			return { ...prevState, [key]: value };
		});
	};
};

export default useUpdateObjectState;
