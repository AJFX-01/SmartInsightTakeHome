
import express from 'express';
import sequelize from './config/database.js';
import apiRoutes from './routes/api.js';
import { Server } from 'socket.io';
import http from 'http';
import Autobot from './models/Autobot.js';
import cron from 'node-cron';
import { processAutobotsInBatches } from "./jobs/createAutobots.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/api', apiRoutes);



sequelize.sync().then(() => {
    console.log('Database synced');
  
    // Socket.io Setup
    io.on('connection', (socket) => {
      console.log('User connected');
  
      // Function to send Autobot count to the client
      const sendAutobotCount = async () => {
        const count = await Autobot.count();
        socket.emit('autobotCount', count);
      };
  
      // Send the current count immediately when a user connects
      sendAutobotCount();
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  
    // Schedule the cron job to run every hour
    cron.schedule('0 * * * *', async () => {
      console.log('Running task to create 500 Autobots');
      await processAutobotsInBatches();
  
      // After processing, emit the updated Autobot count to all connected clients
      const count = await Autobot.count();
      io.emit('autobotCount', count);
    });
  
    // Start the server
    server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
});
// Sync Database
// sequelize.sync().then(() => {
//   console.log('Database synced');

//   // Socket.io Setup
//   io.on('connection', (socket) => {
//     console.log('User connected');

//     const sendAutobotCount = async () => {
//       const count = await Autobot.count();
//       socket.emit('autobotCount', count);
//     };

//     sendAutobotCount();

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
//   });
// });
