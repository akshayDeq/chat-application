
const express = require("express");
const roomRouter = express.Router();
const Room = require('../models/RoomModels');

// get all available rooms present in the database
roomRouter.get('/rooms' , async (req,res)=>{
    try{
        let data = await Room.find({})
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        res.status(500).json({message:err});
    }
})

// get a particular room by ID present in the database
roomRouter.get('/rooms/:id' , async (req,res)=>{
    try{
        let _id = req.params.id;
        let data = await Room.find({_id});
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        res.status(500).json({message:err});
    }
})

roomRouter.post('joinroom' , (req , res)=>{
    
})
module.exports = roomRouter;