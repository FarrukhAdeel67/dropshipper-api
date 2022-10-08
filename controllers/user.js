const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      if (!name || !email || !password || !phoneNumber) {
        throw { error: 400, message: "Required fields can't be empty." };
      }
      const nameFound = await Users.findOne({
        where: { name },
      });
      if (nameFound) {
        throw { error: 409, message: "Name already exists" };
      }
      let user = await Users.create({
        name,
        email,
        phone_number: phoneNumber,
        password,
      });
      user = user.toJSON();
      delete user.password;
      const token = jwt.sign({ user }, "jwt_secret");
      return res.status(200).send({ user, token });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  logIn: async (req, res) => {
    try {
      let { user } = req;
      console.log(user.id);
      const { name, password } = req.body;
      if (!name || !password) {
        throw { status: 400, message: "Required fields cannot be empty." };
      }
      if (user.name !== name) {
        throw { error: 404, message: "user name does not exists" };
      }
      const hashedPassword = await bcrypt.compare(password, user.password);
      if (!hashedPassword) {
        throw { status: 401, message: "Password is incorrect" };
      }
      //   res.status(200).send({user})
      res
        .status(301)
        .redirect("http://localhost:3000/api/users/:userId/logIn/homePage");
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  homePage: async (req, res) => {
    res.status(200).render("homepage");
  },
  update: async (req, res) => {
    try {
      const { name } = req.body;
      let { user } = req;
      let updatedUser = await user.update({
        name: name ? name : user.name,
      });
      updatedUser = updatedUser.toJSON();
      delete updatedUser.password;
      return res.status(200).send({ updatedUser });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};
