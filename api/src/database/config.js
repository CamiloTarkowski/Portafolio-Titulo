import { Sequelize } from "sequelize";

export const connectDB = async () => {
  const sequelize = new Sequelize("mysql://root:1234@127.0.0.1:3306/db");

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
