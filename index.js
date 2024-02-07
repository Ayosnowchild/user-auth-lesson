const express = require("express");
const mongoose = require("mongoose");
const {
  createStudent,
  basePath,
  notFound,
  fetchAllStudents,
  updateStudent,
  findStudentById,
  deleteStudent,
} = require("./controllers/student.controllers");
const { createTeacher } = require("./controllers/teacher.controllers");
const {
  validateSignUpMiddleware,
} = require("./models/validators/auth.validator");
const { signUpUser } = require("./controllers/auth.controllers");
const api = express();
let PORT = 4747;

api.use(express.json());

// middleware to read formdata/urlencoded reqbody
api.use(
  express.urlencoded({
    extended: true,
  })
);

api.post("/student", createStudent);

api.get("/student", fetchAllStudents);

api.put("/student/:id", updateStudent);

api.get("/student/:id", findStudentById);

api.delete("/student/:id", deleteStudent);

api.post("/teacher", createTeacher);

api.post("/signup", validateSignUpMiddleware, signUpUser);

api.get("/", basePath);

api.all("*", notFound);
api.listen(PORT, async () => {
  try {
    console.log("server connected");
    await mongoose.connect("mongodb://127.0.0.1:27017/store-collections");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
});
