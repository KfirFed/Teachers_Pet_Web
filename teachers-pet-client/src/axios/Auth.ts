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