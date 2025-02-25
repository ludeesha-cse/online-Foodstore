import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginUser(email, password);
    user.token = token;
    user.password = "";
    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send(user);
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      res.status(HTTP_BAD_REQUEST).json({ message: error.message });
    } else {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;

  try {
    // Call the service to register the user
    const { user, token } = await registerUser(name, email, password, address);
    user.token = token;
    user.password = "";
    // Set the token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send the response
    res.status(201).send(user);
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  }
});
