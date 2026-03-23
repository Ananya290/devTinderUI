import { createAction, props } from '@ngrx/store';
import { User } from '../auth.model';
export const login = createAction('[Auth] Login Start',props<{ emailId: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success',props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure',props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const signUp = createAction('[Auth] Sign Up Start',props<{ firstName: string; lastName: string; emailId: string; password: string; age: number; gender: string; image: File; skills: string; about: string }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success',props<{ user: User }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure',props<{ error: any }>());



export const setUser = createAction(  '[Auth] Set User',props<{ user: any }>());
