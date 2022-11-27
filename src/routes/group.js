import { handleGetGroup } from "../controller/groupController";

const groupAPI = (router) => {
  router.get("/group/read", handleGetGroup);
};

module.exports = groupAPI;
