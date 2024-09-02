import express from "express";
import { recipes } from "./recipes.js";
import { faker } from "@faker-js/faker";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`Welcome to the Cooking recipe API`);
});

app.get(`/recipes`, (req, res) => {
  res.json(recipes);
});

app.post("/recipes", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Inputdata is missing" });
  }
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is missing" });
  }
  const new_id = faker.string.uuid();
  const rest_of_recipe_information = req.body;

  const recipe = { id: new_id, ...rest_of_recipe_information };

  recipes.push(recipe);

  console.log(
    "Recipe added: ",
    recipes.map((r) => ({ id: r.id, name: r.name }))
  );
  res.status(201).json(recipe);
});

app.get("/recipes/:id", (req, res) => {
  const requested_id = req.params.id;

  const recipe = recipes.find((r) => r.id === requested_id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: `Recipe not found for id: ${requested_id}` });
  }
});

app.put("/recepies/id", (req, res) => {
  const requested_id = req.params.id;

  const index = recipes.find((r) => r.id === requested_id);

  if (index !== -1) {
    recipes[index] = { ...recipes[index].id, ...req.body };

    res.json(recipes[index]);
  } else {
    res.status(404).json({ error: `Recipe not found for id: ${requested_id}` });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
