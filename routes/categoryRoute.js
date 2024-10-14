import express from "express";
import {
  createCategory,
  deletecategory,
  getCategory,
} from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name", deletecategory);
categoryRouter.get("/", getCategory);

export default categoryRouter;
