import app from "./src/app.js";
import config from "./src/config/config.js";
import { Server } from "socket.io";
import {createServer} from "http"


const server=createServer(app)
const io=new Server(server)


server.listen(process.env.PORT,()=>{
    console.log("Server running on port",process.env.PORT)
})

app.get("/",(req,res)=> {
    res.send("HEY")
})

