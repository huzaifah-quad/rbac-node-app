const express = require('express');
const router = express.Router();
const BasicAuthMiddleware = require('../../src/middleware/BasicAuthMiddleware');
const UserController = require('../../src/controller/UserController')

// Menu route
router.get(
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user menu.'
    /* 
    #swagger.security = []
    #swagger.responses[200] = {
            description: 'User menu retrieved successfully.',
            schema: { $ref: '#/definitions/definitionMenuResponse' }
    } #swagger.responses[401] = {
            description: 'Unauthorized.'
    } #swagger.responses[500] = {
            description: 'Internal server error.',
            schema: { $ref: '#/definitions/GeneralError' }
    }
    */ 
    '/menu', BasicAuthMiddleware, UserController.getMenu);
router.post('/create', BasicAuthMiddleware, UserController.createUser);
router.post('/update', BasicAuthMiddleware, UserController.updateUser);
router.delete('/delete', BasicAuthMiddleware, UserController.deleteUser);

const definitionMenuResponse = {

    definitionMenuResponse: {
        type: 'object',
        properties: {
            menu: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        icon: { type: 'string' },
                        url: { type: 'string' }
                    }
                }
            }
        }       
    }
    };

module.exports = router;
module.exports.definitionMenuResponse = definitionMenuResponse;