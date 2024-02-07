const { Student } = require("../models/student.model");

function basePath(req, res) {
  try {
    res.status(201).json({
      message: "welcome to our platform",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

function notFound(req, res) {
  try {
    res.status(404).json({
      message: "page not found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

async function createStudent(req, res) {
  try {
    let studentExist = await Student.findOne({ name: req.body.name });
    if (studentExist) {
      return res.status(400).json({ message: "This student already exists" });
    }
    let student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: "student created successfully",
      data: {
        _id: student.id,
        name: student.name,
        email: student.email,
        teacher: student.teacher.ref,
        age: student.age,
        favSubject: student.favSubject,
        class: student.class,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

async function updateStudent(req, res) {
  try {
    let id = req.params.id;
    // let newStudent = await Student.findByIdAndUpdate(id, req.body);
    let studentExist = await Student.findById(id);
    if (!studentExist) {
      return res
        .status(404)
        .json({ message: " student not found, can not be updated" });
    }
    await studentExist.updateOne(req.body);
    return res.status(201).json({
      message: "student updated successfully",
      data: studentExist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function fetchAllStudents(req, res) {
  try {
    let students = await Student.find({}).populate("teacher");
    res.status(201).json({
      message: "students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when fetching student",
    });
  }
}

async function findStudentById(req, res) {
  try {
    let studentExist = await Student.findById(req.params.id).populate(
      "teacher"
    );
    if (!studentExist) {
      return res.status(404).json({ message: "This student does not exists" });
    }
    res.status(201).json({
      message: "student fetched successfully",
      data: studentExist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function deleteStudent(req, res) {
  try {
    let id = req.params.id;
    let studentExist = await Student.findById(id);
    if (!studentExist) {
      return res
        .status(404)
        .json({ message: " student not found, can not be deleted" });
    }
    let student = await Student.findByIdAndDelete(id);
    res.status(201).json({
      message: "student deleted",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  createStudent,
  findStudentById,
  basePath,
  notFound,
  fetchAllStudents,
  updateStudent,
  deleteStudent,
};
