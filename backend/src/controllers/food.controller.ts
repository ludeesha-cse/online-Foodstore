import asyncHandler from "express-async-handler";
import {
  findFoods,
  getFoods,
  getFoodsByID,
  getFoodsByTag,
  getTagTypes,
} from "../services/food.service";

export const getAllFoods = asyncHandler(async (req, res) => {
  try {
    // Call the service to get all foods
    const foods = await getFoods();

    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ message: "Failed to fetch foods" });
  }
});

export const searchFoods = asyncHandler(async (req, res) => {
  try {
    const foods = await findFoods(req.params.searchTerm);
    res.send(foods);
  } catch (error) {
    console.error("Error searching foods:", error);
    res.status(500).json({ message: "Failed to search foods" });
  }
});

export const getTagTypesHandler = asyncHandler(async (req, res) => {
  try {
    const tags = await getTagTypes(); // add to the begining of the tags
    res.send(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "Failed to fetch tags" });
  }
});

export const getFoodByTag = asyncHandler(async (req, res) => {
  try {
    const foods = await getFoodsByTag(req.params.tagName);
    res.send(foods);
  } catch (error) {
    console.error("Error fetching foods by tag:", error);
    res.status(500).json({ message: "Failed to fetch foods by tag" });
  }
});

export const getFoodById = asyncHandler(async (req, res) => {
  const foodId = req.params.foodId;
  try {
    const food = await getFoodsByID(foodId);
    res.send(food);
  } catch (error) {
    console.error("Error fetching food by id:", error);
    res.status(500).json({ message: "Failed to fetch food by id" });
  }
});
