

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const jwtSecret="Mynameisyuvrajvishnukhilari#!"

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("location").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

      // Create the user with the hashed password
      await User.create({
        name: req.body.name,
        password: hashedPassword, // Use the hashed password
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);




router.post(
    "/loginuser",
    [body("email").isEmail(), body("password").isLength({ min: 5 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      try {
        const email = req.body.email;
        const password = req.body.password;
  
        // Find the user by email
        const userData = await User.findOne({ email: email });
        if (!userData) {
          return res
            .status(400)
            .json({ errors: "Invalid email or password" });
        }
  
        // Compare the password provided with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ errors: "Invalid email or password 2" });
        }

        const data ={
            user:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(data,jwtSecret)
  
        // Authentication successful
        return res.json({ success: true,authToken:authToken});
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }
  );
  

module.exports = router;
