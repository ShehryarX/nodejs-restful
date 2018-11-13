const express = require("express");
const router = express.Router();

const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    // 404 not found
    return res.status(404).send("The course with the given ID was not found");
  }

  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // look up course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if doesn't exist, return 404
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // validate
  const { error } = validateCourse(req.body);

  // invalid - return 400
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // update course
  course.name = req.body.name;

  // return updated course to client
  res.send(course);
});

router.delete("/:id", (req, res) => {
  // look up course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // return 404 if doesn't exist
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the same course
  res.send(course);
});

router.get("/:year/:month", (req, res) => {
  const { query, params } = req;

  res.send({ query, params });
});

const validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
};

module.exports = router;
