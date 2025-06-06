// import RegistrationForm from "./RegistrationForm";
import { Card, CardContent } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ConnectedUser } from "../../types/User";
import { login, register } from "../../axios/Auth";
import { axiosCreateImage } from "../../axios/Images";

export const Register: React.FC = () => {
  const { updateConnectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onRegister = async (
    email: string,
    username: string,
    password: string,
    profileImage: string
  ) => {
    try {
       await register(
        email,
        username,
        password,
        profileImage
      );
      const connectedUser: ConnectedUser = await login(email, password);
      if (!!connectedUser) {
        updateConnectedUser(connectedUser);
        navigate("/posts");
      }
    } catch (err: any) {
      console.error(err.message);
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
        <Form onSubmit={onRegister} />
      </CardContent>
    </Card>
  );
};