const socket = io();

const messagesContainer = document.getElementById('messages');

const opMessage = (message) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = message.messenger_id;
  const h6 = document.createElement('h3');
  h6.textContent = message.data;
  div.appendChild(p);
  div.appendChild(h6);
  div.style.padding = '3px';
  div.style.margin = '3px';
  div.style.border = '1px solid black';
  messagesContainer.prepend(div);
};

socket.emit('retrieveMessages', 'userID');

socket.on('messages', async (message) => {
  console.log(message);
  opMessage(message);
});
