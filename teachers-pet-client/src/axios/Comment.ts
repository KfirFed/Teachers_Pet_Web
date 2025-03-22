import axiosConnection from "./AxiosConnection";
import { Comment, CreateComment } from "../types/Comment";

const COMMENT_ROUTE = "/comments";

const axiosGetAllCommentsByPostId = async (postId: string): Promise<Comment[]> => {
    try {
        return (await axiosConnection.get(`${COMMENT_ROUTE}/post/:${postId}`)).data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't get comments");
    }
};

const axiosCreatePost = async (comment: CreateComment, accessToken: string): Promise<Response> => {
    try {
        return (await axiosConnection.post(`${COMMENT_ROUTE}/`, comment, { headers: { authorization: `Bearer ${accessToken}` } }))
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Can't create comment");
    }
};