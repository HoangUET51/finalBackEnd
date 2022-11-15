import { createUser, useLogin, refreshToken } from "../service/loginService";
import { destroyToken } from "../service/jwtService";
//Register User
const handleRegister = async (req, res) => {
  try {
    let { email, password, username, phone } = req.body;
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.username ||
      !req.body.phone
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1,
        DT: "",
      });
    }
    if (password && password.length < 4) {
      return res.status(200).json({
        EM: "Inappropriate password length",
        EC: 1,
        DT: "",
      });
    }

    let data = await createUser(email, password, username, phone);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  const { valueLogin, password } = req.body;
  try {
    let data = await useLogin(valueLogin, password);

    res.cookie("jwt", data.DT.accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });

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

const handleRefreshToken = async (req, res) => {
  try {
    let data = await refreshToken(req.body);
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

const handleLogout = (req, res) => {
  try {
    res.clearCookie("jwt");
    destroyToken(req.token);
    return res.status(200).json({
      EM: "logout user successfully",
      EC: 0,
      DT: "",
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
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
};
