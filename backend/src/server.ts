import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find((food) => food.id == foodId);
  res.send(food);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const emailLowercase = email.toLowerCase();
  const user = sample_users.find(
    (user) => user.email.toLowerCase() === emailLowercase && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  }
  else{
    res.status(400).send("Invalid email or password");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Some random text", // Replace with a valid secret or private key
    { expiresIn: "1d" }
  );

  user.token = token;
  return user;
};

const port = 5000;

app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});
