import bcrypt from "bcrypt";

export default [
  {
    name: "Yedu",
    email: "yedu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Author",
    email: "author@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
