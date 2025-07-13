import { config } from "dotenv";
config();

const envConfig = {
  portNumber: process.env.PORT,
  dbname:process.env.DB_Name,
  dbusername:process.env.DB_Username,
  dbpassword:process.env.DB_Password,
  dbhost:process.env.DB_Host,
  dbdialect:process.env.DB_Dialect,
  dbport:process.env.DB_Port

};
export default envConfig;
