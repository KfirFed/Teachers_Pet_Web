import { Card, CardContent } from "@mui/material";
import PostForm from "./../Posts/PostForm";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { axiosCreatePost } from "./../../axios/Post";
import { CreatePost } from "../../types/Post";
import { useNavigate } from "react-router-dom";

export const UploadPost: React.FC = () => {

    const { connectedUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onUpload = async (title: string, content: string, image: string) => {

        try {
            const accessToken = connectedUser?.accessToken;

            if (!accessToken) {
                console.log("No access token found");
                return;
            }

            const imageUrl: string | undefined = ""

            const post: CreatePost = {
                title,
                content,
                image: imageUrl,
                senderId: connectedUser?.id,
                likes: []
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
                <PostForm onSubmit={onUpload} />
            </CardContent>
        </Card>
    );
};
