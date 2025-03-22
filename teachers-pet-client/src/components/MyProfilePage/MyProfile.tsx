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
import { axiosUpdateUser } from "../../axios/User";
import { UserContext } from "../../context/UserContext";
import { axiosCreateImage } from "../../axios/Images";

export const MyProfile: React.FC = () => {
  const { updateConnectedUser } = useContext(UserContext);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { connectedUser } = useContext(UserContext);
  const [username, setUsername] = useState(connectedUser?.username || "");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [image, setImage] = useState<string>(connectedUser?.profileImage || "");
  const [imageUrl, setImageUrl] = useState<string>();


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const accessToken = connectedUser?.accessToken;

    if (!accessToken) {
      setErrors({ submit: "No access token found" });
      return;
    }

    try {
    const uploadedUrl = await uploadImage(imageFile || ({} as File));
      await axiosUpdateUser(
        {
          _id: connectedUser?._id,
          username,
          profileImage: uploadedUrl,
        },
        accessToken
      );
      updateConnectedUser({
        ...connectedUser,
        username,
        profileImage: uploadedUrl,
      });
    } catch (err) {
      setErrors({ submit: "There was an error" });
    } finally {
      setLoading(false);
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
        <Box>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={connectedUser?.email}
              required
              autoComplete="email"
              disabled
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
              {loading ? "We're on it!" : "Update"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
