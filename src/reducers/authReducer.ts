import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { SignupCredentials, SigninCredentials, signup, signin, setToken, logout } from "../services/authService";

export interface User {
  username: string,
  token: string
}

const initialState: User = {
  username: '',
  token: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const loggedUser = action.payload;
      return loggedUser;
    },
    signout() {
      window.sessionStorage.removeItem('authToken');
      return initialState;
    }
  }
});

export const { setUser, signout } = userSlice.actions;

export const userSignUp = (credentials: SignupCredentials) => {
  return async () => {
    try {
      await signup(credentials);
      const signinCredentials: SigninCredentials = {
        username: credentials.email,
        password: credentials.password
      }
      await userSignIn(signinCredentials);
    } catch (error) {
      console.error(error);
    }
  }
}

export const userSignIn = (credentials: SigninCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await signin(credentials);
      window.sessionStorage.setItem('authToken', JSON.stringify(user.auth_token).replace(/\W/g, ''));
      window.sessionStorage.setItem('username', credentials.username);
      const newToken: string = window.sessionStorage.getItem('authToken')!;
      dispatch(setUser({
        username: credentials.username,
        token: newToken
      }));
    } catch (error) {
      console.error(error);
    }
  }
}

export const userSignOut = () => {
  return async (dispatch: AppDispatch) => {
    await logout();
    setToken('');
    dispatch(signout());
  }
}

export default userSlice.reducer;