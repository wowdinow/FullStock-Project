const { verifyToken } = require("../helpers/jwt");
const { User, MyStock } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    let payload = verifyToken(access_token);

    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email
    };

    next();
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    let { id } = req.user;
    let myStock = await MyStock.findByPk(req.params.id);

    if (!myStock) {
      throw { name: "Not Found" };
    }

    if (myStock.UserId !== id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authorization,
};
