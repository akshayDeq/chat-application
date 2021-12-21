const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  connectedusers: [
    {
      _id: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        minlength: 3,
      },
      admin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  messages: [
    {
      _id: {
        type: String,
        unique: [true, "ID already exists"],
        default: null,
      },
      content: {
        type: String,
      },
      userid: {
        type: String,
      },
      time: {
        type: String,
        default: Date.now(),
      },
    },
  ],
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
