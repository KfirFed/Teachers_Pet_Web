import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import commentsRoute from "./routes/comments_route";
import postsRoute from "./routes/posts_route";
import usersRoute from "./routes/users_route";
import authRoute from "./routes/auth_route";
import aiRoute from "./routes/ai_route";
import imagesRoute from "./routes/images_route"
import path from "path"

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/comments", commentsRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/ai", aiRoute);
app.use("/public", express.static("public"));
app.use("/image", imagesRoute);
app.use(express.static("images"));

app.get("*", (req, res) => {
  res.sendFile(path.join("images", "index.html"));
});

export const swagger = (app: Express) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web class 01 - Ofri & Kfir REST API",
        version: "1.0.0",
        description: "Ofri & Kfir REST server with jwt authentication",
      },
      servers: [{ url: `${process.env.BASE_URL + port}` }],
    },
    apis: ["./routes/*.ts"],
  };
  const specs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

};

export const initApp = () => {
  return new Promise<Express>((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        resolve(app);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
