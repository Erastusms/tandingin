// const { createClient } = require('redis');
// const { Schema, EntityId, Repository } = require('redis-om')
// // const { leagueSchema } = require('../validator/RedisSchema/League')

// const albumSchema = new Schema('album', {
//     artist: { type: 'string' },
//     title: { type: 'string' },
//     year: { type: 'number' },
//     genres: { type: 'string[]' },
//     songDurations: { type: 'number[]' },
//     outOfPublication: { type: 'boolean' }
// }, {
//     dataStructure: 'JSON'
// })

// const RedisFunction = async () => {

//     const redis = createClient();
//     redis.on('error', (err) => console.log('Redis Client Error', err));
//     await redis.connect();

//     console.log('masuk redis')

//     // const aString = await redis.ping() // 'PONG'
//     // const aNumber = await redis.hSet('foo', 'alfa', '42', 'bravo', '23') // 2
//     // const aHash = await redis.hGetAll('foo') // { alfa: '42', bravo: '23' }

//     // console.log('aHash') // { alfa: '42', bravo: '23' }
//     // console.log(aHash)
//     const albumRepository = new Repository(albumSchema, redis)
//     let album = {
//         artist: "Mushroomhead",
//         title: "The Righteous & The Butterfly",
//         year: 2014,
//         genres: ['metal'],
//         songDurations: [204, 290, 196, 210, 211, 105, 244, 245, 209, 252, 259, 200, 215, 219],
//         outOfPublication: true
//     }

//     album = await albumRepository.save(album)
//     console.log('album[EntityId]')
//     console.log(album)

//     return album;
// }

// module.exports = { RedisFunction };
