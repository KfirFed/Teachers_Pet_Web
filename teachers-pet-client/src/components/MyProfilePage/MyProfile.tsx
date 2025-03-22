import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { askAI } from "../../axios/AI";
import styles from "./MyProfile.module.css";
import { UserContext } from "../../context/UserContext";
import { axiosCreateImage } from "../../axios/Images";

export const MyProfile: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { connectedUser } = useContext(UserContext);
  const [username, setUsername] = useState(connectedUser?.username || "");
  const [profileImage, setProfileImage] = useState(
    connectedUser?.profileImage || ""
  );
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>(connectedUser?.profileImage || "");
  const [image, setImage] = useState<string>(connectedUser?.profileImage || "");

  console.log("check", imageUrl);

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
        setImageUrl((response.data.url as string) || "");
        console.log(setImageUrl);
        return imageUrl;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    return imageUrl;
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
        <Box>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Edit Profile
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={connectedUser?.email}
              required
              autoComplete="email"
              disabled
              // className={styles.input}
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
              // className={styles.input}
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
              {imageUrl ? (
                <CardMedia component="img" height="194" image={imageUrl} />
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
              {loading ? "We're on it!" : "Update"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
