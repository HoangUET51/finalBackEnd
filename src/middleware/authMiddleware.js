import { verifyToken } from "../service/jwtService";
require("dotenv").config();
const nonSecurePaths = [
  "/",
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

const accessTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "access-token-secret";

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const isAuth = async (req, res, next) => {
  const cookies = req.cookies;
  const tokenFormHeader = extractToken(req);

  if (nonSecurePaths.includes(req.path)) return next();
  if (cookies?.jwt || tokenFormHeader) {
    try {
      const token = cookies?.jwt ? cookies?.jwt : tokenFormHeader;
      const decoded = await verifyToken(token, accessTokenSecret);
      req.user = decoded;
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).json({
        EM: "No token provided",
        EC: -1,
        DT: [],
      });
    }
  } else {
    return res.status(401).json({
      EM: "No token provided.",
      EC: -1,
      DT: [],
    });
  }
};

const checkUserPermisstion = (req, res, next) => {
  if (
    nonSecurePaths.includes(req.path) ||
    req.path === "/account" ||
    req.path === "/logout"
  )
    return next();
  if (req.user) {
    let roles = req?.user?.data?.groupWithRole?.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "you dont permisstion to access this... ",
        EC: -1,
        DT: [],
      });
    }
    let canAcess = roles.some((it) => currentUrl.includes(it.url));
    if (canAcess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: "you dont permisstion to access this... ",
        EC: -1,
        DT: [],
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not token provided.",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  isAuth,
  checkUserPermisstion,
};
