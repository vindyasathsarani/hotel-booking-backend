import express from "express";
import {
  createCategory,
  deletecategory,
  updateCategory,
  getCategory,
  getCategoryByName,
} from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

categoryRouter.delete("/:name", deletecategory);

categoryRouter.get("/:name", getCategoryByName);

categoryRouter.get("/", getCategory);

categoryRouter.put("/:name", updateCategory);

export default categoryRouter;
