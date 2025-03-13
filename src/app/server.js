// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//   },
// });

// let users = {};  // Store user => socket ID mappings

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Store user when they join
//   socket.on('joinChat', (username) => {
//     users[username] = socket.id;
//     console.log(`${username} joined with ID: ${socket.id}`);
//     console.log("Current users:", users);
//   });

//   // Send message to a specific user
//   socket.on('sendMessage', ({ sender, receiver, message }) => {
//     console.log(`Message from ${sender} to ${receiver}: ${message}`);

//     if (users[receiver]) {
//       io.to(users[receiver]).emit('receiveMessage', { sender, message });
//       console.log(`✅ Message sent to ${receiver}`);
//     } else {
//       console.log(`❌ Error: User ${receiver} not found`);
//     }
//   });

//   // Remove user on disconnect
//   socket.on('disconnect', () => {
//     for (let user in users) {
//       if (users[user] === socket.id) {
//         console.log(`${user} disconnected.`);
//         delete users[user];
//       }
//     }
//     console.log("Updated users:", users);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
