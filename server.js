import app from "./app.js";
import config from"./config/config.js"
import { Server } from "socket.io";
import {createServer} from "http"
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const server=createServer(app)
const io=new Server(server)
const port=process.env.PORT || 3000

const __filename= fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("recieve-location",{id:socket.id, ...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
})

server.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${port}`)
})

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=> {
    res.render("index")

})

