import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRoute.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;
console.log(connectionString);

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token != null) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conneted to the database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
