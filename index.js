const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

app.use(cors());

const messagingService = require('./components/gossipMessagingService/messagingService');
const config = require('./config/config');

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  socket.on('retrieveMessages', async (userID) => {
    socket.emit('messages', { messenger_id: 'swastik', data: 'hello bro' });
  });
});

http.listen(config.PORT, () => {
  console.log('listening to port 5000');
});
