import style from "./Register.module.css";
import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box } from "@mui/material";

interface FormProps {
  onSubmit: (email: string, username: string, password: string, profileImage: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit(email, username, password, profileImage);
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
          {loading ? "Almost there.." : "Register"}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;