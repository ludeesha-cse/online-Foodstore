import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { generateTokenResponse } from "../utils/generateToken";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  address: string
) => {
  const lowercaseEmail = email.toLowerCase();

  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email: lowercaseEmail });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await UserModel.create({
    name,
    email: lowercaseEmail,
    password: encryptedPassword,
    address,
    isAdmin: false,
  });

  // Generate and return the token
  const token = generateTokenResponse(newUser);
  return { user: newUser, token };
};

export const loginUser = async (email: string, password: string) => {
  const lowercaseEmail = email.toLowerCase();
  const user = await UserModel.findOne({ email: lowercaseEmail });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateTokenResponse(user);
  return { user, token };
};
