import db from "../models/models/index";

const getAllGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name", "description"],
    });
    if (data) {
      return {
        EM: "Get All Group successfully",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Not Found Data",
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
module.exports = { getAllGroup };
