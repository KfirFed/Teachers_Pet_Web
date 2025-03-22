import { Card, CardContent } from "@mui/material";
import PostForm from "./../Posts/PostForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { axiosCreatePost } from "./../../axios/Post";
import { CreatePost } from "../../types/Post";
import { useNavigate } from "react-router-dom";
import { axiosCreateImage } from "./../../axios/Images";

export const UploadPost: React.FC = () => {
  const { connectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadImage = async (file: File) => {
    const ImageData = new FormData();
    if (file) {
      ImageData.append("file", file);
      try {
        const response = await axiosCreateImage(ImageData);
        const uploadedUrl = response.data.url;
        setImageUrl(uploadedUrl);
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

      const uploadedUrl = await uploadImage(imageFile || ({} as File));

      const post: CreatePost = {
        title,
        content,
        image: uploadedUrl,
        senderId: connectedUser?._id,
        likes: [],
      };

      const response = await axiosCreatePost(post, accessToken);

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
    >
      <CardContent>
        <PostForm onSubmit={onUpload} setImageFile={setImageFile} post={undefined} boxTitle="Create Post"/>
      </CardContent>
    </Card>
  );
};
