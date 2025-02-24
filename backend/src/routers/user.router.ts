import { Router } from "express";
import { sample_users } from "../data";
import { UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import auth from "../middlewares/auth.mid";
import { getUser, updateUser } from "../controllers/user.controller";

const router = Router();
router.use(auth);  // every request in this path uses auth middleware to verify the user

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

router.get("/:id", getUser);

router.post("/update", updateUser);

export default router;
