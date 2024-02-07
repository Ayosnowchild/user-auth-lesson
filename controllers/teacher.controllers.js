const { Teacher } = require("../models/teacher.model");

async function createTeacher(req, res) {
  try {
    let teacherExist = await Teacher.findOne({ name: req.body.name });
    if (teacherExist) {
      return res.status(400).json({ message: "This Teacher already exists" });
    }
    let teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json({
      message: "teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = { createTeacher };
