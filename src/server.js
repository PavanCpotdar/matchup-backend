// import http from "http";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { Server } from "socket.io";
// import app from "./app.js";   // 👈 THIS WAS MISSING

// dotenv.config();

// /* Mongo connect */
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true
//     }
// });

// io.on("connection", socket => {

//     socket.on("join", matchId => {
//         socket.join(matchId);
//     });

//     socket.on("sendMessage", data => {
//         io.to(data.matchId).emit("receiveMessage", data);
//     });

// });

// server.listen(5000, () => {
//     console.log("Server running on 5000");
// });
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on("connection", socket => {

    socket.on("join", matchId => {
        socket.join(matchId);
    });

    socket.on("sendMessage", data => {
        io.to(data.matchId).emit("receiveMessage", data);
    });

    socket.on("typing", matchId => {
        socket.to(matchId).emit("typing");
    });

    socket.on("stopTyping", matchId => {
        socket.to(matchId).emit("stopTyping");
    });

    socket.on("seen", data => {
        io.to(data.matchId).emit("seen", data.messageId);
    });

});


server.listen(5000, () => {
    console.log("Server running on 5000");
});
