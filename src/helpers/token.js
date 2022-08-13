const jwt = require("jsonwebtoken");

exports.jwtSign = (id) => {
  return jwt.sign({ id }, process.env.jwt, {
    expiresIn: "1h",
  });
};

exports.jwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.jwt);
  } catch (err) {
    console.log(err);
    return {};
  }
};

exports.jwtDecode = (token) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    console.log(err);
    return {};
  }
};
