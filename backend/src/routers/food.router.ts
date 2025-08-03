import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
import {
  getAllFoods,
  getFoodById,
  getFoodByTag,
  getTagTypesHandler,
  searchFoods,
} from "../controllers/food.controller";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
      res.send({ message: "Food data already seeded" });
      return;
    }
    await FoodModel.create(sample_foods);
    res.send({ message: "Food data seeded successfully" });
  })
);

router.get("/", getAllFoods);

router.get("/search/:searchTerm", searchFoods);

router.get("/tags", getTagTypesHandler);

router.get("/tag/:tagName", getFoodByTag);

router.get("/:foodId", getFoodById);

export default router;
