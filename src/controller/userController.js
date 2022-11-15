import {
  getAllUser,
  getWithPage,
  createUser,
  updateUser,
  deleteUser,
} from "../service/userManagerService";

const handleGetAll = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let data = await getWithPage(+req.query.page, +req.query.limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleCreate = async (req, res) => {
  try {
    let { email, password, username, phone, sex, address } = req.body;

    if (!email || !password || !username || !phone || !sex || !address) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1,
        DT: [],
      });
    }
    if (password && password.length < 5) {
      return res.status(200).json({
        EM: "Inappropriate password length",
        EC: 1,
        DT: [],
      });
    }

    let data = await createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: [],
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleUpdate = async (req, res) => {
  try {
    let { username, address, phone, sex, id, GroupId } = req.body;

    if (!username || !phone || !sex || !address || !id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1,
        DT: [],
      });
    }
    if (!GroupId) {
      return res.status(200).json({
        EM: "Group not found Id",
        EC: 1,
        DT: [],
      });
    }

    let data = await updateUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: [],
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleDelete = async (req, res) => {
  try {
    let data = await deleteUser(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: [],
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "get user account successfully",
    EC: 0,
    DT: {
      access_token: req?.token,
      groupWithRole: req?.user?.data?.groupWithRole,
      email: req?.user?.data?.username,
      username: req?.user?.data?.username,
    },
  });
};

module.exports = {
  handleGetAll,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleGetUserAccount,
};
