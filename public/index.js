const socket = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userID = urlParams.get('id');
const createButton = document.getElementById('createGroup');

const messagesContainer = document.getElementById('messages');

createButton.addEventListener('click', (e) => {
  const groupName = document.getElementById('group').value;
  window.location.href = `group.html?id=${userID}&groupName=${groupName}`;
});

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
  messagesContainer.appendChild(div);
};

const sendMessage = () => {
  const senderID = document.getElementById('recipient').value;
  const message = document.getElementById('sendMessage').value;
  opMessage({ messenger_id: userID, data: message });
  socket.emit('sendMessage', {
    messenger_id: userID,
    recipient_id: senderID,
    data: message,
  });
};

const sendBtn = document.getElementById('btn');
sendBtn.addEventListener('click', () => {
  sendMessage();
});

socket.emit('cacheUserID', userID);

socket.on('messages', async (message) => {
  opMessage(message);
});

socket.on('receivedMessage', async (message) => {
  opMessage(message);
});
