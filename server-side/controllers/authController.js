const { db, query } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { username, email, phone, store_name, password } = req.body;

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(200).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
      username
    )}, ${db.escape(email)}, ${db.escape(phone)}, ${db.escape(
      store_name
    )}, ${db.escape(hashPassword)})`;
    let addUserResult = await query(addUserQuery);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
  login: async (req, res) => {
    // ambil user yang email = email dari body

    // cek apakah ada, kl gaada response email atau password salah

    // klo ada passwordnya di cek menggunakan bcrypt

    // klo salah passwordnya, response email atau password salah

    // klo betul kita akan buatkan token untuk user yang login

    // lalu response

    try {
      const { email, password } = req.body;
      const isEmailExist = await query(
        `SELECT * FROM users WHERE email=${db.escape(email)}`
      );
      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid", success: false });
      }

      const isValid = await bcrypt.compare(password, isEmailExist[0].password);

      if (!isValid) {
        return res
          .status(200)
          .send({ message: "Email or Password is incorrect", success: false });
      }

      return res.status(200).send({
        message: "Login Success",
        data: {
          id: isEmailExist[0].id_users,
          email: isEmailExist[0].email,
          username: isEmailExist[0].username,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchAllUser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(req.user.id)}`
      );
      return res.status(200).send({
        data: {
          isAdmin: users[0].isAdmin,
          id: users[0].id_users,
          name: users[0].name,
          email: users[0].email,
          username: users[0].username,
          imagePath: users[0].imagePath,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};