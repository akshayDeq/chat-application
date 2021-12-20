// using the uuidv4 for generating unique id's for messageId 
const { v4: uuidv4 } = require('uuid');
// importing Room model from models
const Room = require('../database/models/room.model');

function socket(server){
    const io = require('socket.io')(server , {cors:{origin:"*"}});

    io.on('connection' , (socket)=>{
        socket.on("room", async ({username , roomname})=>{
            try{
                    // connecting to a room
                    socket.join(roomname);
    
                    // logic for creating new room & saving in database, if roomname doesn't already exists
                    let roomFound = await Room.findOne({roomname});
                    if(roomFound){
                        await Room.updateOne({roomname},{$push:{connectedusers:{_id:socket.id , username}}});
                    } else {
                        let newRoom = await Room.create({roomname , connectedusers:[{_id:socket.id , username , admin:true}]});
                        await newRoom.save();
                    }
            }catch(err){
                console.log(err);
            }
        })
    
        socket.on("chat message" , async ({message , username , roomname})=>{
            try{
                // broadcasting the user message to all clients
                socket.broadcast.to(roomname).emit("msgdata" , {message , username});
    
                // saving the message based on roomname & userId in database
                let room = await Room.findOne({roomname});
                let user = room.connectedusers.filter((val)=>{
                    return val.username == username;
                })
                room.messages.push({_id:uuidv4() , content:message , userid:user[0]._id})
                room.save();
            } catch(err) {
                console.log(err);
            }
        })
    
        socket.on("leave room" , async ({roomname})=>{
            try{
                // deleting the users from database if they click on leave room
                let room = await Room.findOne({roomname});
                let newArray = room.connectedusers.filter((val)=>{
                    return val._id != socket.id
                });
                room.connectedusers = newArray;
                room.save();
            } catch(err) {
                console.log(err);
            }
        })
    })
}

module.exports = socket;