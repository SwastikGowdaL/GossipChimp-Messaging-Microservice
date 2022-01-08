const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  //* db conn for gossipChimp and another db conn while testing
  GOSSIP_CHIMP: process.env.GOSSIP_CHIMP,

  //* port number
  PORT: process.env.PORT,
};
