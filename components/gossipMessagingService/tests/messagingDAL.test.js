const mongoose = require('mongoose');
const messagingDAL = require('../messagingDAL');

afterAll(() => {
  mongoose.connection.close();
});

// test('save user', async () => {
//   const saved = await messagingDAL.saveUser('617fc7e5e8bee9ff94617ab0');
//   console.log(saved);
//   expect(saved).not.toBeFalsy();
// });

// test('save messengerID', async () => {
//   const messengerStatus = await messagingDAL.saveMessengerID(
//     '617fc7e5e8bee9ff94617ab0',
//     '617fc7e5e8bee9ff94617ab1'
//   );
//   expect(messengerStatus).not.toBeFalsy();
// });

test('save message', async () => {
  const message = await messagingDAL.saveMessage(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab1',
    { data: 'hello', received: true }
  );
  expect(message).not.toBeFalsy();
});
