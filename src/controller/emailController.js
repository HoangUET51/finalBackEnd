import { sendEmail } from "../service/emailService";

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

module.exports = { handleSendEmail };
