import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //const emailLowercase = email.toLowerCase();
  // const user = sample_users.find(
  //   (user) =>
  //     user.email.toLowerCase() === emailLowercase && user.password === password
  // );

  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user, req, res));
  } else {
    res.status(HTTP_BAD_REQUEST).send("Invalid email or password");
  }
});

export const register = asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User already exists");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      token: "",
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser, req, res));
  })

const generateTokenResponse = (user: User, req: any, res: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!, // Replace with a valid secret or private key
    { expiresIn: "1d" }
  );
  user.token = token;

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  //console.log(token)
  return user;
};
