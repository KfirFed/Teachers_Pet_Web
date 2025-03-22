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
    let imageUrl: string = "";

    if (file) {
      ImageData.append("file", file);
      try {
        const response = await axiosCreateImage(ImageData);
        imageUrl = response.data.url as string;
        setImageUrl(response.data.url as string);
        return imageUrl;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    return imageUrl;
  };

  const onUpload = async (title: string, content: string) => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      uploadImage(imageFile!!);

      const post: CreatePost = {
        title,
        content,
        image: imageUrl,
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
        <PostForm onSubmit={onUpload} setImageFile={setImageFile} />
      </CardContent>
    </Card>
  );
};
