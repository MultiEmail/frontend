import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/**
 * @author @is-it-ayush
 * This is redux store. It is used to store the state of the application. 
 * It is a global object that is accessible from anywhere in the application.
 */

export const store = configureStore({
  reducer: {
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
