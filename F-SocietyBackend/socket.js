// import http from "http";
// import { Server } from "socket.io";
// import  express  from "express";
// import { log } from "console";



// /*********************************************SOCKET IO*/
// const app2= express()
// const server = http.createServer(app2);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
// 	console.log(socket.id);
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => { 
// 		socket.broadcast.emit("callEnded")   
// 	}) 

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		console.log(data.signal);
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })

// server.listen(5001, () => console.log("Socket Io Server Running On 5001"))
// /*********************************************SOCKET IO*/