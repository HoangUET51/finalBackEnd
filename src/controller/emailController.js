import {
  sendEmail,
  forgetPassword,
  resetPassword,
} from "../service/emailService";

const handleSendEmail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;

    if (!email || !subject || !content) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: 1,
        DT: [],
      });
    }

    let data = await sendEmail(email, subject, content);
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

const handleForgetPassword = async (req, res) => {
  try {
    let data = await forgetPassword(req.body.email);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    let data = await resetPassword(req.query.email, req.body.password);
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

module.exports = { handleSendEmail, handleForgetPassword, handleResetPassword };
