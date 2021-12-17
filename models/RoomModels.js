const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
    unique: [true, "Room already exists"],
    minlength: 3,
  },
  connectedusers:[{
      _id:{
          type:String,
          required:true,
          unique:[true , "ID already exists"]
      },
      username:{
          type:String,
          required:true,
          minlength:3
      },
      admin:{
          type:Boolean,
          required:true,
          default:false
      }
  }],
  messages:[
      {
          _id:{
            type:String,
            unique:[true , "ID already exists"],
            default:null
        },
          content:{
            type:String,
        },
          userid:{
              _id:{
                  type:String
              }
          },
          time:{
              type:String,
              default:Date.now()
          }
      }
  ]
})

const Room = mongoose.model("room", roomSchema);

module.exports = Room;