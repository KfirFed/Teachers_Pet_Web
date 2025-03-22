import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box, styled, CardMedia } from "@mui/material";
import { Post } from "../../types/Post";

interface PostFormProps {
    onSubmit: (title: string, content: string, image: string) => void;
    setImageFile: (image: File) => void;
    post?: Post;
}

const ImageView = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 200,
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const PostForm: React.FC<PostFormProps> = ({ onSubmit, setImageFile, post }) => {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [image, setImage] = useState(post?.image || "");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            onSubmit(title, content, image);
        } catch (err) {
            setErrors({ submit: "There was an error" });
        } finally {
            setLoading(false);
        }
    };

    const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newURL = URL.createObjectURL(e.target.files[0]);
            setImage(newURL);
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <Box>
            <Typography variant="h5" component="h1" gutterBottom align="center">
                Create Post
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoComplete="title"
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    autoComplete="Content"
                    error={!!errors.content}
                    helperText={errors.content}
                />
                <label
                    htmlFor='photo-upload'
                    style={{
                        cursor: "pointer",
                    }}>
                    <input
                        id='photo-upload'
                        type='file'
                        accept='image/*'
                        onChange={onImageUpload}
                        style={{ display: "none" }}
                    />
                    {image ? (
                        <CardMedia component='img' height='194' image={image} />
                    ) : (<ImageView />)}
                </label>
                {errors.submit && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errors.submit}
                    </Alert>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ my: 3 }}
                >
                    {loading ? "Almost there.." : "Post"}
                </Button>
            </Box>
        </Box>
    );
};

export default PostForm;