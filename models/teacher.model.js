const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
