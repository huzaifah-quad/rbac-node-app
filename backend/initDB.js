require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('./src/models');


Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

console.log('Associations set up successfully');

async function seedRows() {
  await db.sequelize.sync({ force: true });

  let functionDashboard = await db.Function.create({
    function_name: 'Dashboard',
    function_url: '/dashboard',
    function_icon: 'fas fa-home'
  });

  let functionSettings = await db.Function.create({
    function_name: 'Settings',
    function_url: '/settings',
    function_icon: 'fas fa-cog'
  });

  let functionReports = await db.Function.create({
    function_name: 'Reports',
    function_url: '/reports',
    function_icon: 'fas fa-chart-bar'
  });

  let functionReportOperations = await db.Function.create({
    function_name: 'Report Operations',
    function_url: '/report-operations',
    function_icon: 'fas fa-tools',
    function_parent_id: functionReports.function_id
  });

  let functionReportSales = await db.Function.create({
    function_name: 'Report Sales',
    function_url: '/report-sales',
    function_icon: 'fas fa-dollar-sign',
    function_parent_id: functionReports.function_id
  });

  let functionChangePassword = await db.Function.create({
    function_name: 'Change Password',
    function_url: '/change-password',
    function_icon: 'fas fa-lock',
    function_parent_id: functionSettings.function_id
    });

    let functionUserManagement = await db.Function.create({
        function_name: 'User Management',
        function_url: '/user-management', 
        function_icon: 'fas fa-users',
        function_parent_id: functionSettings.function_id
     });

    let roleAdmin = await db.Role.create({
      role_name: 'admin',
      role_desc: 'Administrator'
    });

    //functionDashboard = await db.Function.findOne({ where: { function_name: functionDashboard.function_name } });

    roleAdmin.addFunction(functionDashboard);
    roleAdmin.addFunction(functionSettings);
    roleAdmin.addFunction(functionReports);
    roleAdmin.addFunction(functionReportOperations);
    roleAdmin.addFunction(functionReportSales);
    roleAdmin.addFunction(functionChangePassword);
    roleAdmin.addFunction(functionUserManagement);



    let roleSales = await db.Role.create({
      role_name: 'sales',
      role_desc: 'Sales Team'
    });
    roleSales.addFunction(functionDashboard);
    roleSales.addFunction(functionSettings);
    roleSales.addFunction(functionReportSales);
    roleSales.addFunction(functionChangePassword);

    let userAdmin = await db.User.create({
      user_name: 'admin',
      user_password: bcrypt.hashSync('password', 10),
      user_real_name: 'Admin User'
    });
    await userAdmin.addRole(roleAdmin); 

    let userSales = await db.User.create({
      user_name: 'sales',
      user_password: bcrypt.hashSync('password', 10),
        user_real_name: 'Sales User'    
    });
    try {
      const as = await userSales.addRole(roleSales);
      console.log('Role added to userSales:', as);
    } catch (error) {
      console.error('Error adding role to userSales:', error);
    }
    
}

(async () => {
  try {
    await seedRows();
    console.log('✅ DB seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding DB:', err);
    process.exit(1);
  }
})();