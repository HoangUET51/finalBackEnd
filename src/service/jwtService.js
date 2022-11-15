import jwt from "jsonwebtoken";

const generateToken = (user, secretSignature, tokenLife) => {
  try {
    const userData = {
      username: user.username,
      groupWithRole: user.groupWithRole,
      email: user.email,
    };

    let token = jwt.sign({ data: userData }, secretSignature, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });

    return token;
  } catch (error) {
    return error;
  }
};

const verifyToken = (token, secretKey) => {
  try {
    let decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return error;
  }
};

const destroyToken = (token) => {
  jwt.destroy(token);
};

module.exports = {
  generateToken,
  verifyToken,
  destroyToken,
};
