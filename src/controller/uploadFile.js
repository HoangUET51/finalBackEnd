const handleUploadFile = (req, res) => {
  try {
    const PORT = "http://localhost:8000";
    const { file } = req;
    const urlImage = `${PORT}/${file.path}`;
    return res.status(500).json({
      EM: "uploadfile successfully",
      EC: 1,
      DT: urlImage,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { handleUploadFile };
