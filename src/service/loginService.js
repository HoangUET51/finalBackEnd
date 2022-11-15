import bcrypt from "bcrypt";
import db from "../models/models/index";
import { Op } from "sequelize";
import { generateToken, verifyToken } from "./jwtService";
import { getGroupWithRole } from "./roleService";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";

let tokenList = [];

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

const checkPassword = (inputPassword, hashPass) => {
  return bcrypt.compare(inputPassword, hashPass);
};

const createUser = async (email, password, username, phone) => {
  try {
    let hashPass = hashPassword(password);
    let checkEmail = await checkEmailExits(email);
    let checkPhone = await checkPhoneExits(phone);

    if (checkEmail === true) {
      return {
        EM: "The email is already exits",
        EC: 1,
      };
    }

    if (checkPhone === true) {
      return {
        EM: "The phone is already exits",
        EC: 1,
      };
    }

    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
      phone: phone,
      GroupId: 5,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
    };
  }
};

const useLogin = async (valueLogin, password) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: valueLogin }, { phone: valueLogin }],
      },
    });
    if (user) {
      let checkPass = await checkPassword(password, user.password);
      let groupWithRole = await getGroupWithRole(user);
      const userFakeData = {
        username: user.username,
        groupWithRole: groupWithRole,
        email: valueLogin,
      };

      const accessToken = await generateToken(
        userFakeData,
        accessTokenSecret,
        accessTokenLife
      );

      const refreshToken = await generateToken(
        userFakeData,
        refreshTokenSecret,
        refreshTokenLife
      );

      tokenList[refreshToken] = { accessToken, refreshToken };

      if (checkPass) {
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            accessToken,
            refreshToken,
            info: {
              email: user.email,
              username: user.username,
              groupWithRole: groupWithRole,
            },
          },
        };
      }
    }
    return {
      EM: "Your email/password number or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
      DT: [],
    };
  }
};

const refreshToken = async (refreshToken) => {
  if (refreshToken && tokenList[refreshToken]) {
    console.log(tokenList[refreshToken]);
    try {
      const decoded = await verifyToken(refreshToken, refreshTokenSecret);

      const userFakeData = decoded.data;
      const accessToken = await generateToken(
        userFakeData,
        accessTokenSecret,
        accessTokenLife
      );
      const data = {
        accessToken,
        data: [],
      };
      return {
        EM: "refresh token success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      return {
        EM: "Invalid refresh token.",
        EC: -2,
        DT: [],
      };
    }
  } else {
    return {
      EM: "No token provided.",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  createUser,
  useLogin,
  refreshToken,
};
