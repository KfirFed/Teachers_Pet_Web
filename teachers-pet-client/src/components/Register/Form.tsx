import style from "./Register.module.css";
import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box, CardMedia, styled } from "@mui/material";
import { axiosCreateImage } from "../../axios/Images";

interface FormProps {
  onSubmit: (
    email: string,
    username: string,
    password: string,
    profileImage: string
  ) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [image, setImage] = useState<string>();

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

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newURL = URL.createObjectURL(e.target.files[0]);
      setImage(newURL);
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const ImageData = new FormData();
    if (file) {
      ImageData.append("file", file);
      try {
        const response = await axiosCreateImage(ImageData);
        setImageUrl(response.data.url as string || "");
        console.log(setImageUrl);
        return imageUrl;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    return imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      uploadImage(imageFile || {} as File);
      await onSubmit(email, username, password, imageUrl || "");
    } catch (err) {
      setErrors({ submit: "There was an error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="Username"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password}
        />

        <label
          htmlFor="photo-upload"
          style={{
            cursor: "pointer",
          }}
        >
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: "none" }}
          />
          {image ? (
            <CardMedia component="img" height="194" image={image} />
          ) : (
            <ImageView />
          )}
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
          {loading ? "Almost there.." : "Register"}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
