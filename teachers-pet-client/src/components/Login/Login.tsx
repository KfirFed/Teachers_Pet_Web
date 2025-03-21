import { Card, CardContent } from "@mui/material";
import LoginForm from "./LoginForm";

export const Login: React.FC = () => {
  const handleLogin = async (email: string, password: string) => {

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
        <LoginForm onSubmit={handleLogin} />
      </CardContent>
    </Card>
  );
};