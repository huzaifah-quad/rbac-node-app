
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const logger = require('../../src/common/SystemLogger');

const {
    Unauthorize,
    InternalServerError,
} = require('../../src/common/HttpResponseHelper');


const { User, Role } = require('../../src/models');

// Login route
router.post(
    
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Authorization endpoint for user login.'
    /* 
    #swagger.security = []
    #swagger.parameters['username'] = { in: 'body', default: 'test@email.com' }
    #swagger.parameters['password'] = { in: 'body', default: 'password' }
    #swagger.responses[200] = {
            description: 'User successfully logged in.',
            schema: { $ref: '#/definitions/LoginResponse' }
    } #swagger.responses[401] = {
            description: 'Unauthorized.',
            schema: { $ref: '#/definitions/GeneralError' }
    } #swagger.responses[500] = {
            description: 'Internal server error.',
            schema: { $ref: '#/definitions/GeneralError' }
    }
    */ 
    
    '/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { user_name: username }, include: Role });
        if (!user || !bcrypt.compareSync(password, user.user_password)) {

            const response = await Unauthorize();
            return res.status(response.code).send(response.result);

        }
        const roles = user.Roles.map(r => r.role_id);
        const token = jwt.sign({ user_id: user.user_id, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user_real_name: user.user_real_name });
    } catch (error) {
        logger.error(error);
        const response = await InternalServerError();
        return res.status(response.code).send(response.result);
    }
});

const definitionResponse = {
  // Responses
  LoginResponse: {
    token: "app_token",
    user_real_name: "User_rela_name",
  }
}

module.exports = router;
module.exports.definitionResponse = definitionResponse