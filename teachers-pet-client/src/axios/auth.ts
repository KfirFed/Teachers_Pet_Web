import axiosConnection from "./axiosConnection";
import { ConnectedUser } from "../types/User";

interface loginInfo {
    email: string;
    password: string;
}

const AUTH_ROUTE = "/auth";

export const login = async (loginInfo: loginInfo): Promise<ConnectedUser> => {
    try {
        return (await axiosConnection.post(`${AUTH_ROUTE}/login`, loginInfo)).data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};