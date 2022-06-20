const seedUsers = require("./user-seeds");
const seedComments = require("./comment-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log("\n----- USERS SYNCED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SYNCED -----\n");

  process.exit(0);
};

seedAll();
