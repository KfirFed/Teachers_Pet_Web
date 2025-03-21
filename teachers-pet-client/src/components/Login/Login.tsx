import { useContext } from "react";
import { Card, CardContent } from "@mui/material";
import LoginForm from "./LoginForm";
import { login } from './../../axios/Auth'
import { ConnectedUser } from "../../types/User";
import { UserContext } from "../../context/UserContext";

export const Login: React.FC = () => {

  const { updateConnectedUser } = useContext(UserContext);

  const onLogin = async (email: string, password: string) => {
    try {
      const connectedUser: ConnectedUser = await login(email, password);
      if (!!connectedUser) {
        updateConnectedUser(connectedUser);
        console.log('user cennected --- ', connectedUser)
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
      }}>
      <CardContent>
        <LoginForm onSubmit={onLogin} />
      </CardContent>
    </Card>
  );
};