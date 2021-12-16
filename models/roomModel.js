const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    minlength: 3,
  },
  members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
})

const Room = mongoose.model("room", roomSchema);

module.exports = Room;