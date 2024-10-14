import express from "express";
import {
  createCategory,
  deletecategory,
} from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name", deletecategory);

export default categoryRouter;
