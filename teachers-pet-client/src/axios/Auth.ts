import axiosConnection from "./AxiosConnection";
import { ConnectedUser } from "../types/User";

const AUTH_ROUTE = "/auth";

export const login = async (email: string, password: string): Promise<ConnectedUser> => {
  try {
    return (await axiosConnection.post(`${AUTH_ROUTE}/login`, { email, password })).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  email: string,
  username: string,
  password: string,
  profileImage: string
): Promise<ConnectedUser> => {
  try {
    return (
      await axiosConnection.post(`${AUTH_ROUTE}/register`, {
        email,
        password,
        username,
        profileImage,
      })
    ).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginWithGoogle = async (credential: string): Promise<ConnectedUser> => {
  try {
    return (await axiosConnection.post(`${AUTH_ROUTE}/google`, { credential })).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Google login failed")
  }
};