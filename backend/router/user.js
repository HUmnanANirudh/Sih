const { z } = require('zod');
const JWT_SECRET = require('../config/config');
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/db");  


const Signupschema = z.object({
  Firstname: z.string().trim().toUpperCase(),
  Lastname: z.string().trim().toUpperCase(),
  email: z.string().email({ message: "Invalid email address" }),
  Username: z.string(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});


router.post("/signup", async (req, res) => {
  const body = req.body;
  
  // Zod schema validation
  const parsedData = Signupschema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({
      msg: "Incorrect inputs",
      errors: parsedData.error.issues,
    });
  }

  
  const existingUser = await User.findOne({ Username: body.Username });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

 
  const hashedPassword = await bcrypt.hash(body.password, 10);

  
  const dbUser = await User.create({
    Firstname: body.Firstname,
    Lastname: body.Lastname,
    email: body.email,
    Username: body.Username,
    password: hashedPassword,
  });

  
  const token = jwt.sign(
    {
      userid: dbUser._id,
      role: dbUser.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    msg: "User created successfully!",
    token: token,
  });
});

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const UsernameSchema = z.object({
  Username: z.string({ message: "Username cannot be empty" }),
  password: z.string(),
});


router.post("/signin/email", async (req, res) => {
  const body = req.body;
  
  
  const parsedData = EmailSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const existingUser = await User.findOne({ email: body.email });
  if (!existingUser) {
    return res.status(404).json({ msg: "No such user exists" });
  }

  const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid password" });
  }

 
  const token = jwt.sign(
    {
      userid: existingUser._id,
      role: existingUser.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    msg: "Welcome back!",
    token: token,
  });
});


router.post("/signin/username", async (req, res) => {
  const body = req.body;

  const parsedData = UsernameSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({ msg: "Invalid username or password" });
  }


  const existingUser = await User.findOne({ Username: body.Username });
  if (!existingUser) {
    return res.status(404).json({ msg: "No such user exists" });
  }

  
  const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid password" });
  }

 
  const token = jwt.sign(
    {
      userid: existingUser._id,
      role: existingUser.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    msg: "Welcome back!",
    token: token,
  });
});

module.exports = router;
