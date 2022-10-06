import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {},
});

/**
 * Use TAppDispatch type for the constant that you will create using useAppDispatch hook
 *
 * @author aayushchugh
 *
 * @example
 * ```tsx
 * cont dispatch: TAppDispatch = useAppDispatch()
 * ```
 */
export type TAppDispatch = typeof store.dispatch;

/**
 * Use `TRootState` as type for `state` parameter in useAppSelector
 *
 * @author aayushchugh
 *
 * @example
 * ```tsx
 * const user = useAppSelector((state: TRootState) => state.user)
 * ```
 */
export type TRootState = ReturnType<typeof store.getState>;

export default store;
