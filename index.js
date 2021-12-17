// require dotenv for accessing secured variables ${dbPassword}
require('dotenv').config();

// establish connection to database
require('./database/mongoConnection');

const express = require("express");
var cors = require('cors');
const app = express();
const PORT = 3000 || process.env.PORT;
const server = require('http').createServer(app);
const io = require('socket.io')(server , {cors:{origin:"*"}});
const Room = require('./models/RoomModels');

app.use(cors());
app.use(express.json());

// require all routers
// const userRouter = require('./routes/userRoute');
// const roomRouter = require('./routes/roomRoute');

// middlewares
// for user
// app.use(userRouter);
// for chat room
// app.use(roomRouter);

io.on('connection' , (socket)=>{
    console.log("socket connected");
    socket.on("room", async ({username , roomname})=>{
        try{
                console.log("running");
                let roomFound = await Room.findOne({roomname});
                if(roomFound){
                    await Room.updateOne({roomname},{$push:{connectedusers:{_id:socket.id , username}}});
                }else{
                    let newRoom = await Room.create({roomname , connectedusers:[{_id:socket.id , username , admin:true}]});
                    await newRoom.save();
                }
        }catch(err){
            console.log(err);
        }
    })
    socket.on("chat message" , (data)=>{
        
    })
    socket.on("disconnect" , async ()=>{
        try{
            let result = await Room.findOne({connectedusers:{_id:socket.id}});
            Room.findOneAndUpdate({})
            console.log(result);
        }catch(err){
            console.log(err);
        }
    })
})

app.get('/', (req , res)=>{
    res.sendFile(__dirname + '/static/index.html');
});

server.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
});