const redis = require('redis');

const createRedisClient = async () => {
  const client = redis.createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  return client;
};

module.exports = createRedisClient;
