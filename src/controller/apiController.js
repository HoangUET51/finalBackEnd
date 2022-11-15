import {
  getUserList,
  createNewUser,
  updateUserInfo,
  deleteUser,
} from "../service/userService";

const handleGetAllUsers = async (req, res) => {
  let userList = await getUserList();
  return res.status(200).json({
    message: "successfully",
    data: userList,
  });
};

const handleCreateUser = async (req, res) => {
  let { email, password, username, address, phone, sex } = req.body;
  console.log(res.body);
  if (!email || !password || !username || !address || !phone || !sex) {
    return res.status(200).json({
      message: "create failed",
    });
  }
  await createNewUser(email, password, username, address, phone, sex);

  return res.status(200).json({
    message: "successfully",
  });
};

const handleUpdateUser = async (req, res) => {
  let { email, username, address, id } = req.body;
  await updateUserInfo(email, username, address, id);
  return res.status(200).json({
    message: "successfully ",
  });
};

const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params.id);
  return res.status(200).json({
    messages: "successfully",
  });
};

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};
