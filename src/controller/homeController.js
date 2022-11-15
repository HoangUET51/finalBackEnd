import {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
} from "../service/userService";

const handleHello = (req, res) => {
  return res.render("home.ejs");
};

const handleCreateUser = (req, res) => {
  let { email, password, username } = req.body;

  createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleUser = async (req, res) => {
  //model => get data from database
  let userList = await getUserList();
  return res.render("user.ejs", { userList });
};

const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await getUserById(id);
  return res.render("update.ejs", { user });
};

const handleUpdateUser = async (req, res) => {
  let { email, username, id } = req.body;
  console.log({ email, username, id });
  await updateUserInfo(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHello,
  handleUser,
  handleCreateUser,
  handleDeleteUser,
  getUpdateUser,
  handleUpdateUser,
};
