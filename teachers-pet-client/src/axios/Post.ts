import axiosConnection from "./AxiosConnection";
import { Post } from "../types/Post";

const POST_ROUTE = "/posts";

export const axiosGetAllPosts = async (): Promise<Post[]> => {
    try {
        return (await axiosConnection.get(`${POST_ROUTE}/all`)).data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't get posts");
    }
};