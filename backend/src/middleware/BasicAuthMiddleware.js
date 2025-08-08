const logger = require('../common/SystemLogger');
const {
  Unauthorize,
  InternalServerError,
} = require('../common/HttpResponseHelper');
const { log } = require('winston');

const jwt = require('jsonwebtoken');

module.exports = async function BasicAuthMiddleware(req, res, next) {

  try {

    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        const response = await Unauthorize();
        return res.status(response.code).send(response.result);
      }

      //get and check URL that allow to user based on roles and functions.
      //skip for now, just used simple JWT validation

      req.user = payload;
      next();
    });

  } catch (error) {
    console.log(error);
    log.console(error);
    const response = await InternalServerError();
    res.status(response.code).send(response.result);
  }

};

