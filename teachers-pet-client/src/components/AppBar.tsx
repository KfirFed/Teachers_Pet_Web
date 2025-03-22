import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logout } from "../axios/Auth";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
    const { connectedUser, resetConnectedUser } = useContext(UserContext);
  

  const doLogout = async () => {
    try {
      if (!connectedUser?.refreshToken) {
        throw new Error("User not logged in");
      }
      await logout(connectedUser, connectedUser?.refreshToken);
      resetConnectedUser();
      navigate("/landing");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} hidden={!connectedUser}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2 }}
            onClick={() => navigate("/posts")}
          >
            Posts
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2 }}
            onClick={() => navigate("/uploadPost")}
          >
            Upload
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2 }}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2 }}
            onClick={() => navigate("/ai")}
          >
            AskAI
          </Typography>
          <Button color="inherit" sx={{ ml: "75%" }} onClick={doLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
