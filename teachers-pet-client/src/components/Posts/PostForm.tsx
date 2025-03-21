import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box } from "@mui/material";

interface PostFormProps {
    onSubmit: (title: string, content: string, image: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit(title, content, image);
        } catch (err) {
            setErrors({ submit: "There was an error" });
        } finally {
            setLoading(false);
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
                    label="UserName"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    autoComplete="Content"
                    error={!!errors.content}
                    helperText={errors.content}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="file"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    error={!!errors.image}
                    helperText={errors.image}
                />
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
                    {loading ? "Almost there.." : "Posted"}
                </Button>
            </Box>
        </Box>
    );
};

export default PostForm;