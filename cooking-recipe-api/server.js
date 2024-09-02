import express from "express";
import { recipes } from "./recipes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`Welcome to the Cooking recipe API`);
});

app.get(`/recipes`, (req, res) => {
  res.json(recipes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
