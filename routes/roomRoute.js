import express from "express";
import {
  createRoom,
  deleteRoom,
  findRoomById,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", createRoom);

roomRouter.delete("/:roomId", deleteRoom);

roomRouter.get("/:roomId", findRoomById);

export default roomRouter;
