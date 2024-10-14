import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Create a new user and hash their password
export function postUsers(req, res) {
  const user = req.body;

  // Hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, 10); // Hash the password with salt rounds = 10

  user.password = passwordHash; // Set the hashed password

  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User Created Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User Creation Failed",
        error: err.message,
      });
    });
}

// Login the user by comparing the password correctly
export function loginUser(req, res) {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email: email })
    .then((user) => {
      if (user == null) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      // If password is valid, generate a JWT token
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "48h",
      });

      // Return success response with the token
      res.json({
        message: "Login successful",
        user: user,
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Login failed",
        error: err.message,
      });
    });
}
