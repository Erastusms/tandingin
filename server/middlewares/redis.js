require('dotenv').config();

const redis = require('redis');
// class CacheService {
//   constructor() {
//     this._client = redis.createClient({
//       socket: {
//         host: process.env.REDIS_SERVER,
//       },
//     });

//     this._client.on('error', (error) => {
//       console.error(error);
//     });

//     this._client.connect();
//   }

//   async set(key, value, expirationInSecond = 1800) {
//     await this._client.set(key, value, {
//       EX: expirationInSecond,
//     });
//   }

//   async get(key) {
//     const result = await this._client.get(key);
//     return result;
//   }

//   delete(key) { return this._client.del(key); }
// }

// module.exports = CacheService;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on('error', (error) => console.error(`Error : ${error}`));

  await redisClient.connect({
    url: process.env.REDIS_URL
  });
})();

module.exports = redisClient;
