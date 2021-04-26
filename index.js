const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors=require("cors");


app.use(cors());
app.use(express.static("public"));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  let drawing=false;
  socket.on("mousedown",(x,y)=>{
    console.log("mouse down");
    drawing=true;
    io.emit("_mousedown",drawing,x,y);
  });
  socket.on("mouseup",()=>{
    console.log("mouse up");
    drawing=false;
    io.emit("_mouseup",drawing);
  })  
  socket.on("mousemove",(x,y)=>{
    if(drawing){
      console.log("mouse move");
      io.emit("_mousemove",x,y)
    }   
  }); 
});
server.listen(3030, () => {
  console.log('listening on *:3030');
});