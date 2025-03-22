import { UpdateUser } from "../types/User";
import axiosConnection from "./AxiosConnection";

const USER_ROUTE = "/users";

const axiosUpdateUser = async (
  user: UpdateUser,
  accessToken: string
): Promise<Response> => {
  try {
    return await axiosConnection.put(`${USER_ROUTE}/${user._id}`, user, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Can't update user");
  }
};

export {axiosUpdateUser};