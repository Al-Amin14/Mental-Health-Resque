const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const users = require("../model/signUp.js");
const chats = require("../model/chated.js");
const message = require("../model/message.js");
const handleusers = require("../middleware/handleusers.js");

routes.post("/accessChat", handleusers, async (req, res) => {
  const { userid } = req.body;

  if (!userid) {
    return res.status(422).json({ error: "Please provide details" });
  }

  var ischat = await chats
    .find({
      isgrouphchat: false,
      $and: [
        { users: { $elemMatch: { $eq: userid } } },
        { users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestmessage");

  ischat = await users.populate(ischat, {
    path: "latestmessage.sender",
    select: "fullname email",
  });

  if (ischat.length > 0) {
    console.log(` printing chats ${ischat}`);
    res.json(ischat[0]);
  } else {
    const chatdata = {
      chatname: "sender",
      isgrouphchat: false,
      users: [req.user._id, userid],
    };
    try {
      const createchat = await chats.create(chatdata);
      const fullchat = await chats
        .findOne({ _id: createchat._id })
        .populate("users", "-password");
      res.status(200).json(fullchat);
    } catch (error) {
      res.status(422).json({ error: "There is a problems" });
    }
  }
});

routes.get("/fetchAllchat", handleusers, (req, res) => {
  try {
    chats
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("grouphadmin", "-password")
      .populate("latestmessage")
      .sort({ updateAt: -1 })
      .then(async (result) => {
        result = await users.populate(result, {
          path: "latestmessage.sender",
          select: "fullname email",
        });
        res.json(result);
      });
  } catch (error) {
    res.status(422).json({ error: "Error Found !" });
  }
});

routes.get("/chatdetails", (req, res) => {
  const { chatid } = req.body;

  if (!chatid) {
    req.status(422).json({ error: "Please Provide all details" });
  } else {
    chats
      .findById(chatid)
      .populate("users", "-password")
      .populate("grouphadmin", "-password")
      .then((result) => res.json(result))
      .catch((error) => res.status(422).json({ error: "There is a problem" }));
  }
});

routes.post("/createGrouphs", handleusers, async (req, res) => {

  if (!req.body.users || !req.body.name) {
   return res.status(422).json({ error: "Provide all the fields" });
  } 
  else {
    var alluser = JSON.parse(req.body.users);

    console.log(alluser);

    if (alluser.length < 2) {
      return res.status(422).json({ error: "Not valid for creating a grouph" });
    }
    console.log(req.user._id)

    await alluser.push(req.user._id);

    try {
      chats.findOne({ users: alluser }).then((result) => {
        if (!result) {
          chats
            .create({
              chatname: req.body.name,
              users: alluser,
              isgrouphchat: true,
              grouphadmin: req.user,
            })
            .then((results) => res.json(results))
            .catch((error) => {
              res.status(422).json({ error: error });
            });
        }
        else{
            res.json(result)
        }
      });
    } catch (error) {}
  }
});


routes.put("/renameGrouph", (req,res)=>{
    const {chatid,name}=req.body

    if(!chatid){
        res.status(422).json({error:"Provide details"})
    }else{
        chats.findByIdAndUpdate(chatid,{
            $set:{chatname:name}
        },{
            new :true
        },
    ).populate("users","-password").populate("isgrouphchat","-password").then(result=>{
        res.json(result)
    }).catch(error=>{
        res.status(422).json({error:error})
    })
    }
})






module.exports = routes;
