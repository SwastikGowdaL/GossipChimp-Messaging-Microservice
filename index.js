const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

app.use(cors());

const messagingService = require('./components/gossipMessagingService/messagingService');
const messagingDAL = require('./components/gossipMessagingService/messagingDAL');
const config = require('./config/config');
const messages = require('./models/messages');

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

io.on('connection', async (socket) => {
  socket.on('cacheUserID', async (userID) => {
    await messagingDAL.cacheSocketID(userID, socket.id);
  });
  socket.on('retrieveMessages', async (userID) => {});
  socket.on('sendMessage', async (message) => {
    const socketID = await messagingDAL.retrieveCachedSocketID(
      message.recipient_id
    );
    if (socketID) {
      io.to(socketID).emit('receivedMessage', message);
    }
    await messagingDAL.saveMessage(message.messenger_id, message.recipient_id, {
      data: message.data,
      received: false,
    });
    await messagingDAL.saveMessage(message.recipient_id, message.messenger_id, {
      data: message.data,
      received: true,
    });
  });

  socket.on('createGroup', async (details) => {
    socket.join(details.groupName);
    socket.emit('created', { message: 'created successfully' });
  });

  socket.on('sendGroupMessage', async (details) => {
    socket.broadcast
      .to(details.groupName)
      .emit('receivedGroupMessage', details);
  });
});

http.listen(config.PORT, () => {
  console.log('listening to port 5000');
});
