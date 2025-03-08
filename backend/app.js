const express = require("express");
const { Server } = require("socket.io");
const app = express();
const port = 3003;

const bodyParse = require("body-parser");
const dotnev = require("dotenv");
dotnev.config();

const mongoose = require("mongoose");
const auth = require("./routes/auth.js");
const checkUser = require("./routes/UserCheck.js");
const chatapis = require("./routes/chatapis.js");
const reporting = require("./routes/report.js");
const vlogscontent = require("./routes/blogs.js");
const notifyingreports = require("./routes/reports_notify.js");
const cors = require("cors");
const messagesroute = require("./routes/messagesapis.js");
const notification=require("./routes/notificaions.js")

mongoose.connect(process.env.Mongo_Url);
mongoose.connection.on("connected", () => {
  console.log(`connected on ${process.env.Mongo_Url}`);
});

mongoose.connection.on("error", () => {
  console.log(`error on ${process.env.Mongo_Url}`);
});

app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use("", auth);
app.use("", checkUser);
app.use("", chatapis);
app.use("", messagesroute);
app.use("/reports", reporting);
app.use("/vlogs", vlogscontent);
app.use("/notifying", notification);
app.use("/notifyingreports", notification);

app.get("/livinglife/living", (req, res) => {
  res.json(
    "One day you will leave this world behind so live a life that you will remember!!!!"
  );
});

let server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const io = require("socket.io")(server, {
  pingtimeout: 600000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData);
    // console.log(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room : " + room);
  });

  socket.on("new message", (newMessageRecived) => {
    var chat = newMessageRecived.chat;
    
    if (!chat.users) return console.log("Chat.user not defiend");
    
    chat.users.forEach((user) => {
      if (user._id == newMessageRecived.sender._id) return;
      
      console.log(user._id)
      socket.in(user._id).emit("message received", newMessageRecived);
    });
  });
});
