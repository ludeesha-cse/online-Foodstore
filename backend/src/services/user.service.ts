import { UserModel } from "../models/user.model";

// Get user by ID
export const findUserById = async (id: string) => {
  return await UserModel.findById(id);
};

//Update user details
export const updateUserById = async (id: string, name: string, email: string, address: string) => {
  return await UserModel.findByIdAndUpdate(
    { _id: id },
    { name, email, address },
    { new: true }
  );
};
