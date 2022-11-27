import {
  handleSendEmail,
  handleForgetPassword,
  handleResetPassword,
} from "../controller/emailController";
const emailAPI = (router) => {
  router.post("/email/send", handleSendEmail);
  router.post("/forget-password", handleForgetPassword);
  router.get("/reset-password", handleResetPassword);
};

module.exports = emailAPI;
