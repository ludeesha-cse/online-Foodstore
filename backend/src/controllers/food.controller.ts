import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

export const getAllFoods = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find();
  res.send(foods);
});

export const searchFoods = asyncHandler(async (req, res) => {
  const seacrhRegx = new RegExp(req.params.searchTerm, "i"); //i -> case insensitive
  const foods = await FoodModel.find({ name: { $regex: seacrhRegx } });
  res.send(foods);
});

export const getTagTypes = asyncHandler(async (req, res) => {
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
});

export const getFoodByTag = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });
  res.send(foods);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const foodId = req.params.foodId;
  const food = await FoodModel.findById(foodId);
  res.send(food);
});
