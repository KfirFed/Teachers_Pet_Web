import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/users_model";
import { generateToken, verifyRefreshToken } from "./../utils/auth";
import { verifyGoogleToken } from "./../utils/googleAuth";
import {
  getUserByEmail,
  createGoogleUser,
  updateRefreshTokenByUserId,
} from "./users_controller";
import { User } from "./../models/users_model";

const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      profileImage: req.body.profileImage,
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("wrong username or password");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send("wrong username or password");
      return;
    }
    if (!process.env.TOKEN_SECRET) {
      res.status(500).send("Server Error");
      return;
    }
    const tokens = generateToken(user._id.toString());
    if (!tokens) {
      res.status(500).send("Server Error");
      return;
    }
    if (!user.refreshToken) {
      user.refreshToken = [];
    }
    user.refreshToken.push(tokens.refreshToken);
    await user.save();
    res.status(200).send({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _id: user._id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const user = await verifyRefreshToken(req.headers.authorization);
    await user.save();
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send("fail");
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const user = await verifyRefreshToken(req.headers.authorization);
    if (!user) {
      res.status(400).send("fail");
      return;
    }
    const tokens = generateToken(user._id);
    if (!tokens) {
      res.status(500).send("Server Error");
      return;
    }
    if (!user.refreshToken) {
      user.refreshToken = [];
    }
    user.refreshToken.push(tokens.refreshToken);
    await user.save();
    res.status(200).send({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _id: user._id,
    });
  } catch (err) {
    res.status(400).send("fail");
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      throw new Error("Google credential is required");
    }

    const googleUser = await verifyGoogleToken(credential);
    let user: User = await getUserByEmail(googleUser.email);

    if (!user) {
      user = await createGoogleUser({
        email: googleUser.email,
        username: googleUser.username,
        password: "password",
        refreshToken: [],
        profileImage: ""
      });
    }

    const userTokens = generateToken(user._id);
    await updateRefreshTokenByUserId(user, userTokens.refreshToken);

    user = {
      email: user.email,
      password: user.password,
      username: user.username,
      refreshToken: [userTokens.refreshToken],
      profileImage: "",
    };

    res.status(200).send(user._id);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export default { register, login, logout, refresh, googleLogin };
