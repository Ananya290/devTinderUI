import { createAction, props } from '@ngrx/store';
import { User } from '../auth.model';
export const login = createAction('[Auth] Login Start',props<{ emailId: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success',props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure',props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
