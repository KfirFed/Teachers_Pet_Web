import { Button } from "@mui/material";
// import RegistrationForm from "./RegistrationForm";
import { Form } from "./Form";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
// import { register } from "../../queries/auth";
// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
// import { User } from "../../queries/user";
// import { toast } from "react-toastify";
// import { uploadImg } from "../../utils/uploadImage";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  //   const { updateConnectedUser } = useContext(UserContext);

  //   const handleRegister = async (data: User, imgFile?: File) => {
  //     try {
  //       if (imgFile) {
  //         const url: string | undefined = await uploadImg(imgFile!!);
  //         data.image = url ?? "";
  //       }

  //       const connectedUser = await register(data);

  //       if (!!connectedUser) {
  //         updateConnectedUser(connectedUser);
  //         navigate("/post");
  //       }
  //     } catch (err: any) {
  //       console.error(err.message);
  //       toast.error(" משהו השתבש!");
  //     }
  //   };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher's Pet</h1>
      <h2 className={styles.description}>Almost there, just a few details</h2>

      <Form />
      <button className={styles.loginButton} onClick={() => navigate("/login")}>
        Did you already register? Login here
      </button>
    </div>
  );
};
