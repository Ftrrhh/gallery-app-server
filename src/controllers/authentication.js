import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { username, password, email, namalengkap, alamat, confPassword } = req.body;

    const cekUsername = await UserModel.findOne({ where: { username } });

    if (cekUsername) {
      return res.status(409).json({ errors: "Username Sudah Digunakan" });
    }

    if (password !== confPassword)
      return res.status(400).json({ msg: "Confirm your Password" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await UserModel.create({
        username,
        email,
        namalengkap,
        alamat,
        password: hashPassword,
      });
      res.json({ msg: "Register berhasil" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ errors: e.message });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: e.message });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      where: {
        username: req.body.username,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await UserModel.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await UserModel.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await UserModel.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {}
};

//Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await UserModel.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign(
          {
            userId,
            username,
            email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Verify Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.username = decoded.username;
    next();
  });
};
