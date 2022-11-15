import {
  createRole,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
} from "../service/roleService";

const handleCreateRole = async (req, res) => {
  try {
    let data = await createRole(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetAllRoles = async (req, res) => {
  try {
    let data = await getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleDeleteRole = async (req, res) => {
  try {
    let data = await deleteRole(+req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetRoleByGroup = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await getRoleByGroup(+id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleAssignRoleToGroup = async (req, res) => {
  try {
    console.log(req.body);
    let data = await assignRoleToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleCreateRole,
  handleGetAllRoles,
  handleDeleteRole,
  handleGetRoleByGroup,
  handleAssignRoleToGroup,
};
