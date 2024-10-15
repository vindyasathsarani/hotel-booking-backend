import express from "express";
import { createRoom, deleteRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", createRoom);

roomRouter.delete("/:roomId", deleteRoom);

export default roomRouter;
