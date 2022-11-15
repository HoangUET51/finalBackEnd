import express from "express";
import {
  handleUser,
  handleHello,
  handleCreateUser,
  handleDeleteUser,
  getUpdateUser,
  handleUpdateUser,
} from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", handleHello);
  router.get("/user", handleUser);
  router.post("/users/create-user", handleCreateUser);
  router.post("/delete-user/:id", handleDeleteUser); // truyền id động bằng cách sử dụng :id
  router.get("/update-user/:id", getUpdateUser);
  router.post("/user/update-user", handleUpdateUser);
  return app.use("/", router);
};

export default initWebRoutes;
