import bcrypt from "bcrypt";
import db from "../models/models/index";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (
  email,
  password,
  username,
  address,
  phone,
  sex
) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
      address: address,
      phone: phone,
      sex: sex,
    });
  } catch (err) {
    console.log("Check err", err);
  }
};

const getUserList = async () => {
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email", "address"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });

  console.log("check user", newUser);

  const users = await db.User.findAll();
  return users;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user;
};

const updateUserInfo = async (email, username, address, id) => {
  await db.User.update(
    { email: email, username: username, address: address },
    { where: { id: id } }
  );
};

module.exports = {
  hashPassword,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
