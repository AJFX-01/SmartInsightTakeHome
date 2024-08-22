import express from 'express';
import sequelize from './config/database.js';
import apiRoutes from './routes/api.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/api', apiRoutes);

// Sync Database
sequelize.sync().then(() => {
  console.log('Database synced');

  // Socket.io Setup
  io.on('connection', (socket) => {
    console.log('User connected');

    const sendAutobotCount = async () => {
      const count = await Autobot.count();
      socket.emit('autobotCount', count);
    };

    sendAutobotCount();

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
