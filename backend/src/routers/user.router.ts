import jwt from "jsonwebtoken";
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
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
      res.send(generateTokenResponse(user, req, res));
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
);

router.post(
  "/update",
  asyncHandler(async (req:any, res:any) => {
    const { id, name, email, address } = req.body;

    try {
      // Check if the user with the given id exists in the database
      const user = await UserModel.updateOne({_id:id}, {name, email, address});
      // console.log(user);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Update user fields
      // if (name) user.name = name;
      // if (email) user.email = email.toLowerCase();
      // if (address) user.address = address;
      

      // Save the updated user to the database
      // const updatedUser = await user.save();

      // Optionally, you can generate and send a new token response here if needed

      res.send(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).send("Error updating user");
    }
  })
);

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

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  user.token = token;
  //console.log(token)
  return user;
};

export default router;
