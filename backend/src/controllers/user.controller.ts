import asyncHandler from "express-async-handler";
import { findUserById, updateUserById } from "../services/user.service";

export const getUser = asyncHandler(
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      // Check if the user is authorized to access this route
      if (req.user.id != req.params.id) {
        res.status(403).json({ message: "you are not allowed" });
      }
      const user = await findUserById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error); // Ensure proper error handling
    }
  }
);

export const updateUser = asyncHandler(async (req: any, res: any) => {
  const { id, name, email, address } = req.body;

  try {
    // Check if the user with the given id exists in the database
    const updatedUser = await updateUserById(id, name, email, address);

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Error updating user");
  }
});
