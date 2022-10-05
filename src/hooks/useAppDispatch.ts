import { useDispatch } from "react-redux";
import { TAppDispatch } from "../types/types";

/**
 * use `useAppDispatch` throughout the code instead of `useDispatch`
 *
 * @author aayushchugh
 * @constant
 */
export const useAppDispatch = () => useDispatch<TAppDispatch>();
