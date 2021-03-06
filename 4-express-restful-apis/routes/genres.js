const express = require("express");
const router = express.Router();

const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Horror" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenreName(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  return res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const { error } = validateGenreName(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  return res.send(genre);
});

const validateGenreName = genre => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(req.body, schema);
};

module.exports = router;
