import multer from "multer";
const path = require("path");
const mkdirp = require("mkdirp");

const uploadFile = (type) => {
  const made = mkdirp.sync(`./public/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/${type}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".gif" &&
        ext !== ".jpeg"
      ) {
        cb(new Error("Only images are allowed"));
      }
      cb(null, true);
    },
  });

  return upload.single(type);
};

module.exports = uploadFile;
