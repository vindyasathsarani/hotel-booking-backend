import Room from "../models/room.js";
import { isAdminVaid } from "./userControllers.js";

//create room

export function createRoom(req, res) {
  if (!isAdminVaid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const newRoom = new Room(req.body);
  newRoom
    .save()
    .then((result) => {
      res.json({
        message: "Room created successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Room creation failed",
        error: err,
      });
    });
}
