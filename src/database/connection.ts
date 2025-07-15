import { Sequelize, DataType } from "sequelize-typescript";
import envConfig from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.dbname, //database  ko name
  username: envConfig.dbusername, // database ko username by default root
  password: envConfig.dbpassword, //database ko password by default empty hunxa
  host: envConfig.dbhost, //database ko location kaha xa vannne kuro ,localhost(mycomputer)
  dialect: "mysql", //kun database use garna aateyko
  port: Number(envConfig.dbport),
  models:[__dirname + '/models']
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => {
    console.error("  error ");
  });

sequelize.sync({ alter: false })
  .then(() => {
    console.log("✅ Migrated successfully with new changes");
  })
  

  export default sequelize
