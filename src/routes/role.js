import {
  handleCreateRole,
  handleGetAllRoles,
  handleDeleteRole,
  handleGetRoleByGroup,
  handleAssignRoleToGroup,
} from "../controller/roleController";

const roleAPI = (router) => {
  router.get("/role/read", handleGetAllRoles);
  router.post("/role/create", handleCreateRole);
  router.delete("/role/delete/:id", handleDeleteRole);
  router.get("/role/by-group/:id", handleGetRoleByGroup);
  router.post("/role/assign-role-to-group", handleAssignRoleToGroup);
};

module.exports = roleAPI;
