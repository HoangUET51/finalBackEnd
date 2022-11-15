import bcrypt from "bcrypt";
import db from "../models/models/index";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExits = async (email) => {
  let userEmail = await db.User.findOne({
    where: { email: email },
  });
  if (userEmail) {
    return true;
  }
  return false;
};

const checkPhoneExits = async (phone) => {
  let userPhone = await db.User.findOne({
    where: { phone: phone },
  });
  if (userPhone) {
    return true;
  }
  return false;
};

const getAllUser = async () => {
  try {
    let data = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true,
    });
    if (data) {
      return {
        EM: "Get All successfully",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Get All successfully",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const getWithPage = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true,
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalPages: totalPages,
      totalItems: count,
      data: rows,
    };
    return {
      EM: "Get All successfully",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
    };
  }
};

const createUser = async (data) => {
  try {
    let hashPass = hashPassword(data.password);
    let checkEmail = await checkEmailExits(data.email);
    let checkPhone = await checkPhoneExits(data.phone);

    if (checkEmail === true) {
      return {
        EM: "The email is already exits",
        EC: 1,
        DT: [],
      };
    }

    if (checkPhone === true) {
      return {
        EM: "The phone is already exits",
        EC: 1,
        DT: [],
      };
    }

    await db.User.create({
      email: data.email,
      password: hashPass,
      username: data.username,
      address: data.address,
      phone: data.phone,
      sex: data.sex,
      GroupId: data.GroupId,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let checkPhone = await checkPhoneExits(data.phone);

    if (checkPhone === true) {
      return {
        EM: "The phone is already exits",
        EC: 1,
        DT: [],
      };
    }

    let user = await db.User.findOne({
      where: { id: +data.id },
    });

    if (user) {
      await user.update({
        username: data.username,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        GroupId: +data.GroupId,
      });
      return {
        EM: "A user is update successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not found ",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    const data = await db.User.findOne({
      where: { id: id },
    });
    if (data) {
      await data.destroy();
      return {
        EM: "A user is delete successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  getWithPage,
  createUser,
  updateUser,
  deleteUser,
};
