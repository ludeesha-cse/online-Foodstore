import jwt  from 'jsonwebtoken';
import { Router } from "express";
import { sample_users } from "../data";
import { UserModel } from '../configs/models/user.model';
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if(userCount>0){
      res.send({message: "USer data already seeded"});
      return;
    }
    await UserModel.create(sample_users);
    res.send({ message: "User data seeded successfully" });
  })
);

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const emailLowercase = email.toLowerCase();
    const user = sample_users.find(
      (user) => user.email.toLowerCase() === emailLowercase && user.password === password
    );
  
    if (user) {
      res.send(generateTokenResponse(user));
    }
    else{
      res.status(400).send("Invalid email or password");
    }
  });
  
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