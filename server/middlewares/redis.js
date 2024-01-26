// const redis = require('redis');

// class CacheService {
//   constructor() {
//     client = redis.createClient({
//       socket: {
//         host: process.env.REDIS_SERVER,
//       },
//     });

//     client.on('error', (error) => {
//       console.error(error);
//     });

//     client.connect();
//   }

//   static async set(key, value, expirationInSecond = 1800) {
//     await client.set(key, value, {
//       EX: expirationInSecond,
//     });
//   }

//   static async get(key) {
//     const result = await client.get(key);
//     return result;
//   }

//   static delete(key) { return client.del(key); }
// }

// module.exports = CacheService;
