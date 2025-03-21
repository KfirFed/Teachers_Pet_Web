import axiosConnection from "./AxiosConnection";
import { Post } from "../types/Post";

const POST_ROUTE = "/posts";

const axiosGetAllPosts = async (): Promise<Post[]> => {
    try {
        return (await axiosConnection.get(`${POST_ROUTE}/all`)).data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't get posts");
    }
};

const axiosGetPostsBySender = async (senderId: string | undefined): Promise<Post[]> => {
    try {
        return (await axiosConnection.get(`${POST_ROUTE}/`, { params: { sender: senderId } })).data;
        //todo: check id the route type is correct or need to be changed in the server
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't get posts");
    }
};

export { axiosGetAllPosts, axiosGetPostsBySender }