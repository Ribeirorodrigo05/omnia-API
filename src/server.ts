import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRouter from "./controllers/user/user";
import authenticationRouter from "./controllers/login/login";
import workspaceRouter from "./controllers/workspace/workspace";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/authentication", authenticationRouter);
app.use("/workspace", workspaceRouter);

AppDataSource.initialize()
  .then()
  .catch((e) => console.error(e));

app.listen(3003, () => console.log("server is running"));
