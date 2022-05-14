const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const { v4: uuidv4 } = require('uuid')

app.use(cors())
app.use(express.json())
const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : "*",
        methods : "*"
    }
})

const PORT = process.env.PORT || 3001

app.post("/create",(req,res) => {
    console.log(req.body)
})

const roomUsers = {} //roomID : [{name : "name1"} , {name : "name2"}]


const updateScore = (name,roomID) => {
roomUsers[roomID]
    for(let i = 0; i < roomUsers[roomID].length; i++){
        if(roomUsers[roomID][i].name === name){
            roomUsers[roomID][i].score++
        }
    }
}
// io.of("/").adapter.rooms.has("test") => checks if the room exists or not
// io.of("/").adapter.rooms.get("test").size => checks how many sockets joined in this room
io.on("connection",socket=>{
    console.log("user connected with id = " + socket.id)
    socket.on("create",data=>{
        socket.username = data.name
        const roomID = uuidv4()
        socket.join(roomID)
        roomUsers[`${roomID}`] = new Array()
        roomUsers[`${roomID}`].push({name : data.name, type : "creator",score : 0})
        socket.emit("create",{ok: true, roomID,name:data.name,yourTurn:false,xo:"x"})
    })
    socket.on("join",data=>{
        if(io.of("/").adapter.rooms.has(data.roomID)){
            console.log(io.of("/").adapter.rooms.get(data.roomID).size)
            if(io.of("/").adapter.rooms.get(data.roomID).size < 2){
                socket.join(data.roomID)
                roomUsers[`${data.roomID}`].push({name : data.name, type : "join", score : 0})
                console.log(roomUsers[`${data.roomID}`])
                io.to(data.roomID).emit("users-data",roomUsers[`${data.roomID}`])
                // to set the name and roomID inside join page
                socket.emit("join",{ok: true, ...data})
                // initiate the joined user data
                socket.emit("joined",{ok: true,yourTurn:false,xo:"o", ...data})
                // initiate the created user data and notify the created user that is someone entered the game
                socket.to(data.roomID).emit("joined",{ok: true,yourTurn:true,xo:"x"})
            }
            else{
                socket.emit("join",{ok:false,error : "room is full join another one or create new one"})
            }
        }
        else{
            socket.emit("join",{ok: false, error : "room is not exists, create a new room or check your room ID"})
        }
    })
    socket.on("other-data",data=>{
        socket.to(data.roomID).emit("other-data",data)
    })

    // playing events
    socket.on("play",data=>{
        socket.to(data.roomID).emit("played",data)
    })
    socket.on("win",data=>{
        const name = data.name
        const roomID = data.roomID
        updateScore(name,roomID)
        io.to(roomID).emit("win",roomUsers[roomID])
    })
    socket.on("test",data=>{
        // this is just for testing purposes
        console.log(data)
        socket.emit("test",{msg:"this is just a test",data:data})
    })
    socket.on("disconnect",()=>{
        console.log(socket.id + " is disconnected!")
    })
})


server.listen(PORT,()=>{
    console.log("Server is running on port = "+PORT)
})























