const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const genres = [
  { id: 1, title: "Comedy" },
  { id: 2, title: "Romance" },
  { id: 3, title: "Action" },
  { id: 4, title: "Thriller" },
];

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});
//Get
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});
//Post
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = {
    id: genres.length + 1,
    title: req.body.title,
  };
  genres.push(genre);
  res.send(genre);
});

//Put
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.title = req.body.title;
  res.send(genre);
});

//Delete
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`http://localhost:${port}/`));
