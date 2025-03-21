import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { askAI } from "../../axios/AI";
import styles from "./MyProfile.module.css";
import { UserContext } from "../../context/UserContext";

export const AiPage: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { connectedUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Register
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
          type="file"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          required
          error={!!errors.profileImage}
          helperText={errors.profileImage}
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
          {loading ? "We're on it!" : "Update"}
        </Button>
      </Box>
    </Box>
  );
};
