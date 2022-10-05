import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../types/types";

/**
 * use `useAppSelector` throughout the code instead of `useSelector`
 *
 * @author aayushchugh
 * @constant
 */
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
