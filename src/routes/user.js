import {
  handleCreate,
  handleGetAll,
  handleUpdate,
  handleDelete,
  handleGetUserAccount,
} from "../controller/userController";

const userAPI = (router) => {
  router.get("/account", handleGetUserAccount);
  router.get("/user/read", handleGetAll);
  router.post("/user/create", handleCreate);
  router.put("/user/update", handleUpdate);
  router.delete("/user/delete/:id", handleDelete);
};

module.exports = userAPI;
