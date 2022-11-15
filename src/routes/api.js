import express from "express";
import {
  handleGetAllUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} from "../controller/apiController";

import {
  handleCreate,
  handleGetAll,
  handleUpdate,
  handleDelete,
  handleGetUserAccount,
} from "../controller/userController";

import {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "../controller/authController";

import { handleGetGroup } from "../controller/groupController";
import { handleSendEmail } from "../controller/emailController";
import { isAuth, checkUserPermisstion } from "../middleware/authMiddleware";
import {
  handleCreateRole,
  handleGetAllRoles,
  handleDeleteRole,
  handleGetRoleByGroup,
  handleAssignRoleToGroup,
} from "../controller/roleController";

const router = express.Router();

const initApiRoutes = (app) => {
  //Sử dụng authMiddleware.isAuth trước những api cần xác thực
  // router.all("*", isAuth, checkUserPermisstion);
  //Register User
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogout);
  router.post("/refresh-token", handleRefreshToken);
  router.get("/account", handleGetUserAccount);

  router.get("/users", handleGetAllUsers);
  router.post("/create-user", handleCreateUser);
  router.put("/update-user", handleUpdateUser);
  router.delete("/delete-user/:id", handleDeleteUser);

  //CRUD User

  router.get("/user/read", handleGetAll);
  router.post("/user/create", handleCreate);
  router.put("/user/update", handleUpdate);
  router.delete("/user/delete/:id", handleDelete);

  //Group CRUD

  router.get("/group/read", handleGetGroup);

  //Role CRUD

  router.get("/role/read", handleGetAllRoles);
  router.post("/role/create", handleCreateRole);
  router.delete("/role/delete/:id", handleDeleteRole);
  router.get("/role/by-group/:id", handleGetRoleByGroup);
  router.post("/role/assign-role-to-group", handleAssignRoleToGroup);

  //Email Send

  router.post("/email/send", handleSendEmail);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
