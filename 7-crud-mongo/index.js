const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log("Could not connect to MongoDB: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "Angular Course",
  author: "Shehryar",
  tags: ["angular", "frontend"],
  isPublished: true
});

async function createCourse() {
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // eq = equal
  // ne = not equal
  // gt = greater than
  // gte = great than or equal to
  // lt = less than
  // lte = less than or equal to
  // in
  // nin = not in

  // or
  // and

  // starts with *: /^patternStart/
  // ends with *: /patternEnd$/
  // to ignore case, add i at the end
  // contains: /.*searchString.*/

  // .count() = count documents
  // .skip() = skips entries

  const pageNumber = 1;
  const pageSize = 10;

  const courses = await Course.find({
    author: "Shehryar"
  })
    .find({ author: "Shehryar", isPublished: true })
    // .find({ price: 10 })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .or([{ author: "Shehryar" }, { isPublished: "false" }])
    // .find({ author: /^Shehryar/ })
    // .find({ author: "/Assad^/i" })
    // .find({ author: /.*Shehryar.*/ })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
}

// createCourse();
getCourses();
