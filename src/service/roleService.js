import db from "../models/models/index";

const getGroupWithRole = async (user) => {
  try {
    let groupWithRole = await db.Group.findOne({
      where: { id: user.GroupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    return groupWithRole;
  } catch (error) {
    return error;
  }
};

const createRole = async (roles) => {
  try {
    let allRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const roleDiff = roles.filter(
      ({ url: url1 }) => !allRoles.some(({ url: url2 }) => url2 === url1)
    );

    if (roleDiff.length === 0) {
      return {
        EM: "Nothing roles create",
        EC: 1,
        DT: [],
      };
    }
    await db.Role.bulkCreate(roles);

    return {
      EM: `Create ${roleDiff.length} roles `,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    if (roles.length === 0) {
      return {
        EM: "Nothing roles",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "get Roles successfully",
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
      DT: [],
    };
  }
};

const deleteRole = async (roleId) => {
  try {
    const role = await db.Role.findOne({
      where: { id: +roleId },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "A role is delete successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not found",
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

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "NOt found any Roles",
        EC: 0,
        DT: [],
      };
    }

    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });

    return {
      EM: "Get Roles by Group successfully",
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    await db.GroupRole.destroy({
      where: { GroupId: +data.GroupId },
    });
    await db.GroupRole.bulkCreate(data.groupRoles);
    return {
      EM: "Assgin Role To Group Successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getGroupWithRole,
  createRole,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
