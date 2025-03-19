import { OAuth2Client } from "google-auth-library";
import { User } from "../models/users_model";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token: string) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error("missing GOOGLE_CLIENT_ID");
    }

    const loginToken = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = loginToken.getPayload();
    if (!payload) throw new Error("Invalid token payload");

    return {
      email: payload.email!,
      username: `${payload.name} ${payload.family_name}`!,
    } as Pick<User, "email" | "username">;
  } catch (error) {
    throw new Error("Invalid Google token");
  }
};