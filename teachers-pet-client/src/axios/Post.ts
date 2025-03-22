import axiosConnection from "./AxiosConnection";
import { Post, CreatePost, PostEdit } from "../types/Post";

const POST_ROUTE = "/posts";

const axiosGetAllPosts = async (): Promise<Post[]> => {
  try {
    return (await axiosConnection.get(`${POST_ROUTE}/all`)).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Can't get posts");
  }
};

const axiosGetPostsBySender = async (
  senderId: string | undefined
): Promise<Post[]> => {
  try {
    return (
      await axiosConnection.get(`${POST_ROUTE}/`, {
        params: { sender: senderId },
      })
    ).data;
    //todo: check id the route type is correct or need to be changed in the server
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Can't get posts");
  }
};

const axiosCreatePost = async (
  post: CreatePost,
  accessToken: string
): Promise<Response> => {
  try {
    return await axiosConnection.post(`${POST_ROUTE}/`, post, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Can't save new post");
  }
};

const axiosUpdatePost = async (
  post: PostEdit,
  accessToken: string
): Promise<Response> => {
  try {
    return await axiosConnection.put(`${POST_ROUTE}/${post._id}`, post, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Can't update post");
  }
};

const deletePost = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  try {
    return await axiosConnection.delete(`${POST_ROUTE}/${postId}`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error");
  }
};

const axiosLikePost = async (
  postId: string,
  userId: string,
  accessToken: string
): Promise<Response> => {
  try {
    return await axiosConnection.put(
      `${POST_ROUTE}/${postId}/like`,
      { postId, userId },
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error");
  }
};

export {
  axiosGetAllPosts,
  axiosGetPostsBySender,
  axiosCreatePost,
  axiosLikePost,
  deletePost,
  axiosUpdatePost,
};
