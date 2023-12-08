import dotenv from "dotenv";
import colors from "colors"; // package to highlight seeder function in terminal
import connectDatabase from "./config/db.js";

import userData from "./data/userData.js";
import User from "./models/User.js";

dotenv.config();
connectDatabase();

const importData = async () => {
  try {
    await User.deleteMany();
    const importUserData = await User.insertMany(userData);
    console.log(`Data Imported`.green.inverse);
    process.exit(); // kill connection from terminal
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log(`Data Deleted`.red.inverse);
    process.exit(); // kill connection from terminal
  } catch (error) {
    console.log(`Error${error.message}`.red.inverse);
    process.exit(1);
  }
};

// process.argv is used to add argument to node file
if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
