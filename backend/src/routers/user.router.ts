import jwt from "jsonwebtoken";
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../configs/models/user.model";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send({ message: "USer data already seeded" });
      return;
    }
    await UserModel.create(sample_users);
    res.send({ message: "User data seeded successfully" });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //const emailLowercase = email.toLowerCase();
    // const user = sample_users.find(
    //   (user) =>
    //     user.email.toLowerCase() === emailLowercase && user.password === password
    // );

    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Invalid email or password");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if(user){
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
      isAdmin: false
    } 

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Some random text", // Replace with a valid secret or private key
    { expiresIn: "1d" }
  );

  user.token = token;
  return user;
};

export default router;
