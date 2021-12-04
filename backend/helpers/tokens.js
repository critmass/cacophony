// borrowed from jobly project

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  console.assert(user.isSiteAdmin === undefined,
      "createToken passed user without isSiteAdmin property");

  let payload = {
    id:user.id,
    username: user.username,
    pictureUrl: user.picture_url,
    isSiteAdmin: user.isSiteAdmin || false
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
