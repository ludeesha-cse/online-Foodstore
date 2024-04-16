import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../configs/models/food.model";

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

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const seacrhRegx = new RegExp(req.params.searchTerm, "i"); //i -> case insensitive
    const foods = await FoodModel.find({ name: { $regex: seacrhRegx } });
    res.send(foods);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", count: "$count" } },
      { $sort: { count: -1 } },
    ]);

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all); // add to the begining of the tags
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const foodId = req.params.foodId;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;
