const express = require("express");
const roomRouter = express.Router();
const Room = require("../database/models/room.model");

// get all available rooms present in the database
roomRouter.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// get a particular room by ID present in the database
roomRouter.get("/rooms/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.find({ _id });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = roomRouter;
