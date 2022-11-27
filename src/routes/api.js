import express from "express";
import userAPI from "./user";
import groupAPI from "./group";
import roleAPI from "./role";
import emailAPI from "./email";
import uploadAPI from "./uploadFile";

import {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "../controller/authController";
import { isAuth, checkUserPermisstion } from "../middleware/authMiddleware";

const router = express.Router();

const initApiRoutes = (app) => {
  //Sử dụng authMiddleware.isAuth trước những api cần xác thực
  router.all("*", isAuth, checkUserPermisstion);
  //Register User
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogout);
  router.post("/refresh-token", handleRefreshToken);

  //CRUD User
  userAPI(router);
  //Group CRUD
  groupAPI(router);
  //Role CRUD
  roleAPI(router);
  //Email Send
  emailAPI(router);
  //uploadFile
  uploadAPI(router);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
