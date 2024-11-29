const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Employee = require("../model/employeeMode");

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) {
    return res.status(401).json({ msg: "user already exist" });
  }
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new User({ ...req.body, password: hashPass });
  await newUser.save();
  return res.status(202).json({ mes: "ok" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({ username });
  if (userData === null) {
    return res.status(404).json({ msg: "user not exist" });
  }
  if (await bcrypt.compare(password, userData.password)) {
    const token = await jwt.sign({ userId: userData._id }, "key111");
    return res.status(202).json({ token, msg: "user login successful" });
  } else {
    return res.status(404).json({ msg: "incorrect password" });
  }
});

router.get("/check", async (req, res) => {
  let token = req.headers.authorization;
  if (token === undefined) {
    return res.status(404).json({ msg: "token needed" });
  }
  token = token.split(" ")[1];

  if (token === undefined) {
    return res.status(404).json({ msg: "token needed" });
  }

  try {
    const { userId } = await jwt.verify(token, "key111");
    const userData = await User.findOne({ _id: userId }).select("-password");
    return res.status(202).json({ msg: "ok", userData });
  } catch (err) {
    return res.status(404).json({ msg: "token not vaild", token });
  }
});

router.get("/empolyee", async (req, res) => {
  const employeeList = await Employee.find();
  return res.status(202).json({ msg: "ok", employeeList });
});

router.post("/empolyee", async (req, res) => {
  const { email } = req.body;
  const isEmployeeExist = await Employee.findOne({ email });
  if (isEmployeeExist !== null) {
    return res.status(404).json({ msg: "email already exist" });
  }
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  return res.json({ msg: "ok" });
});

router.get("/edit/employee", async (req, res) => {
  const { id } = req.query;
  const employeeData = await Employee.findOne({ _id: id });
  return res.status(202).json({ msg: "ok", employeeData });
});

router.put("/edit/employee", async (req, res) => {
  const { id } = req.query;
  const employeeData = await Employee.updateOne({ _id: id }, req.body, {
    new: true,
  });
  return res.status(202).json({ msg: "ok" });
});

router.get("/delete/employee", async (req, res) => {
  const { id } = req.query;
  await Employee.deleteOne({_id:id});
  return res.status(202).json({ msg: "ok" });
});

module.exports = router;
