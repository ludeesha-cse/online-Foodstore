import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

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

export default generateTokenResponse;
