import express from "express";
import {
  createCategory,
  deletecategory,
  getCategory,
  getCategoryByName,
} from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name", deletecategory);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.get("/", getCategory);

export default categoryRouter;
