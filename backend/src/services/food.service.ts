import { FoodModel } from "../models/food.model";

export const getFoods = async () => {
  const foods = await FoodModel.find();
  return foods;
};

export const findFoods = async (searchTerm: string) => {
  const seacrhRegx = new RegExp(searchTerm, "i"); //i -> case insensitive
  return await FoodModel.find({ name: { $regex: seacrhRegx } });
};

export const getTagTypes = async () => {
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

  tags.unshift(all); // Add to the beginning of the tags array
  return tags;
};

export const getFoodsByTag = async (tagName: string) => {
  const foods = await FoodModel.find({ tags: tagName });
  return foods;
};

export const getFoodsByID = async (foodId: string) => {
  const food = await FoodModel.findById(foodId);
  return food;
}
