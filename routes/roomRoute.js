import express from "express";
import {
  createRoom,
  deleteRoom,
  findRoomById,
  findRoomsByCategory,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", createRoom);

roomRouter.delete("/:roomId", deleteRoom);

roomRouter.get("/", getRooms);

roomRouter.get("/by-category/:category", findRoomsByCategory);

roomRouter.get("/:roomId", findRoomById);

roomRouter.put("/:roomId", updateRoom);

export default roomRouter;
