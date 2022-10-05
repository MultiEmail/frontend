/**
 * GUIDE:
 * Every type should have prefix `T` eg: TRootState
 */

import store from "../store";

/**
 * Use TAppDispatch type for the constant that you will create using useAppDispatch hook
 *
 * @author aayushchugh <ayushchugh2006@gmail.com>
 * @type
 *
 * @example
 * ```jsx
 * cont dispatch: TAppDispatch = useAppDispatch()
 * ```
 */
export type TAppDispatch = typeof store.dispatch;

/**
 * Use `TRootState` as type for `state` parameter in useAppSelector
 *
 * @author aayushchugh <ayushchugh2006@gmail.com>
 * @type
 *
 * @example
 * ```jsx
 * const user = useAppSelector((state: TRootState) => state.user)
 * ```
 */
export type TRootState = ReturnType<typeof store.getState>;
