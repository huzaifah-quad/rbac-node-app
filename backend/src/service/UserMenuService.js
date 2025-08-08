
const { User, Role, Function, UserRole, RoleFunction } = require('../models');

class UserMenuService {
 
    async getUserMenu(userId) {
        const user = await User.findByPk(userId, {
        include: { model: Role, include: Function }
        });
        
        if (!user) {
        throw new Error('User not found');
        }
    
        let menu = [];

        const allFunctions = user.Roles.flatMap(role => role.Functions);

        
        console.log('All Functions:', allFunctions);

        menu = this.buildMenuTree(allFunctions);
    
        // user.Roles.forEach(role =>
        // role.Functions.forEach(func => {
        //     if (!menu.find(item => item.function_id === func.function_id)) {
        //     menu.push({
        //         function_id: func.function_id,
        //         function_name: func.function_name,
        //         function_url: func.function_url,
        //         function_icon: func.function_icon,
        //         function_parent_id: func.function_parent_id
        //     });
        //     }
        // })
        // );
    
        return menu;
    }

    buildMenuTree(flatFunctions) {
    const menuMap = {};
    const menuTree = [];

    // Step 1: Map all functions by their ID
    flatFunctions.forEach(func => {
        menuMap[func.function_id] = {
        function_id: func.function_id,
        function_name: func.function_name,
        function_url: func.function_url,
        function_icon: func.function_icon,
        menus: []
        };
    });

    // Step 2: Build the hierarchy
    flatFunctions.forEach(func => {
        const parentId = func.function_parent_id;

        if (parentId === null || parentId === undefined) {
        // Root level
        menuTree.push(menuMap[func.function_id]);
        } else if (menuMap[parentId]) {
        // Child level
        menuMap[parentId].menus.push(menuMap[func.function_id]);
        }
    });

    // Step 3: Clean empty `menus` arrays if needed
    function cleanEmptyMenus(menuList) {
        return menuList.map(menu => {
        if (menu.menus.length === 0) {
            delete menu.menus;
        } else {
            menu.menus = cleanEmptyMenus(menu.menus);
        }
        return menu;
        });
    }

    return cleanEmptyMenus(menuTree);
    }

} 

module.exports = UserMenuService;