import { UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";

export const getUser = asyncHandler(
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      if (req.user.id != req.params.id) {
        res.status(404).json({ message: "you are not allowed" });
      }
      const user = await UserModel.findById(req.params.id);

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
    const user = await UserModel.updateOne(
      { _id: id },
      { name, email, address }
    );
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
});
