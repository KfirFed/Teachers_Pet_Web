import axiosConnection from "./AxiosConnection";
import { Comment } from "../types/Comment";

const COMMENT_ROUTE = "/comments";

const axiosGetAllCommentsByPostId = async (postId: string): Promise<Comment[]> => {
    try {
        return (await axiosConnection.get(`${COMMENT_ROUTE}/post/:${postId}`)).data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't get comments");
    }
};