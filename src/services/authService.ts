import axios from "axios";
const baseUrl = 'http://localhost:8000/auth';

export interface SignupCredentials {
  email: string;
  username: string;
  password: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

export let token: string = '';

export const setToken = (newToken: string) => {
  token = `Token ${newToken}`;
}

export const signup = async (credentials: SignupCredentials) => {
  await axios.post(`${baseUrl}/users/`, credentials);
}

export const signin = async (credentials: SigninCredentials) => {
  const response = await axios.post(`${baseUrl}/token/login/`, credentials);

  return response.data;
}

export const logout = async () => {
  const config = {
    headers: { 'Authorization': `Token ${window.sessionStorage.getItem('authToken')}` }
  }

  await axios.post(`${baseUrl}/token/logout/`, '',config)
}