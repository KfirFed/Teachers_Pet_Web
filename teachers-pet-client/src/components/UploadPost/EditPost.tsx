import { Card, CardContent } from "@mui/material";
import PostForm from "./../Posts/PostForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  axiosUpdatePost,
  deletePost,
} from "./../../axios/Post";
import { Post, PostEdit } from "../../types/Post";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosCreateImage } from "./../../axios/Images";

export const EditPost: React.FC = () => {
  const location = useLocation();
  const post = location.state?.post as Post;
  const postId = post?._id;
  const { connectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File>();

  const uploadImage = async (file: File) => {
    const ImageData = new FormData();
    if (file) {
      ImageData.append("file", file);
      try {
        const response = await axiosCreateImage(ImageData);
        const uploadedUrl = response.data.url;
        return uploadedUrl;
      } catch (err) {
        console.log(err);
        return "";
      }
    }
    return "";
  };

  const onUpload = async (title: string, content: string) => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const post: PostEdit = {
        _id: postId,
        title,
        content,
        senderId: connectedUser?._id,
      };

      if (imageFile !== undefined) {
        const uploadedUrl = await uploadImage(imageFile || ({} as File));
        post.image = uploadedUrl;
      }

      const response = await axiosUpdatePost(post, accessToken);

      if (response.status === 200) {
        navigate("/posts");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        mt: 4,
      }}
      hidden={!post}
    >
      <CardContent>
        <PostForm
          onSubmit={onUpload}
          setImageFile={setImageFile}
          post={post}
          boxTitle={"Edit Poat"}
        />
        <button
          onClick={() => {
            deletePost(post?._id || "", connectedUser?.accessToken!!);
            navigate("/posts");
          }}
        >
          Delete Post
        </button>
      </CardContent>
    </Card>
  );
};
