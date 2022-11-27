import uploadFile from "../middleware/uploadFileMiddware";
import { handleUploadFile } from "../controller/uploadFile";

const uploadAPI = (router) => {
  router.post("/upload-file", uploadFile("user"), handleUploadFile);
};

module.exports = uploadAPI;
