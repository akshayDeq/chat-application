const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 3,
  },
  time:{
      type:String,
      default:Date.now()
  },
  userInfo:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' 
  },
  roomInfo:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'room' 
  }
})

const Message = mongoose.model("message", messageSchema);

module.exports = Message;