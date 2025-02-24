import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const generateTokenResponse = (user: User): string => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!, // Replace with a valid secret or private key
    { expiresIn: "1d" }
  );
  return token;
};
