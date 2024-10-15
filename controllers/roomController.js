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

//delete room

export function deleteRoom(req, res) {
  if (!isAdminVaid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
  const roomId = req.params.roomId;

  Room.findOneAndDelete({ roomId: roomId })
    .then(() => {
      res.json({
        message: "Room deleted successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Room deletion failed",
      });
    });
}

///find room by roomId

export function findRoomById(req, res) {
  const roomId = req.params.roomId;
  Room.findOne({ roomId: roomId })
    .then((result) => {
      if (result == null) {
        res.status(404).json({
          message: "Room not found",
        });
      } else {
        res.json({
          message: "Room found",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Room search failed",
        error: err,
      });
    });
}

//find all rooms

export function getRooms(req, res) {
  Room.find()
    .then((result) => {
      res.json({
        rooms: result,
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to get access",
      });
    });
}

//update room

export function updateRoom(req, res) {
  if (!isAdminVaid(req)) {
    // Call the function with req
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const roomId = req.params.roomId;

  Room.findOneAndUpdate({ roomId: roomId }, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Room not found",
        });
      }
      res.json({
        message: "Room updated successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "Room update failed",
        error: err,
      });
    });
}
