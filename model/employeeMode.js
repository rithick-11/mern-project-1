const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  imgUrl:{
    type: String,
    default: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
  }
},{timestamps: true});

const Employee = mongoose.model("employee", employeeSchema)

module.exports = Employee
