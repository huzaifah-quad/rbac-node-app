

const { User, Role, Function, UserRole, RoleFunction } = require('../models');
const UserMenuService = require('../service/UserMenuService');
const menuService = new UserMenuService();

class UserController {

    async getMenu(req, res) {

        // const user = await User.findByPk(req.user.user_id, {
        //     include: { model: Role, include: Function }
        // });
        let menu = [];

        menu = await menuService.getUserMenu(req.user.user_id);


        // user.Roles.forEach(r =>
        //     r.Functions.forEach(f => {
        //         if (!menu.find(x => x.function_id === f.function_id)) {
        //             menu.push({
        //                 function_id: f.function_id,
        //                 function_name: f.function_name,
        //                 function_url: f.function_url,
        //                 function_icon: f.function_icon,
        //                 function_parent_id: f.function_parent_id
        //             });
        //         }
        //     })
        // );
        res.json(menu);

    }

    async getUser(req, res) {
        // Implementation for getting a user
    }

    async createUser(req, res) {
        // Implementation for creating a user
    }

    async updateUser(req, res) {
        // Implementation for updating a user
    }

    async deleteUser(req, res) {
        // Implementation for deleting a user
    }
}

module.exports = new UserController();
