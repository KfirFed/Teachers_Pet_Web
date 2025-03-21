import { Card, CardContent } from "@mui/material";
import PostForm from "./../Posts/PostForm";

export const UploadPost: React.FC = () => {

    const onUpload = async (title: string, content: string, image: string) => {

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
