// const { Client } = require('redis-om')

// const url = process.env.REDIS_URL
// const client = await new Client().open(url)

// module.exports = client

const { Client } = require("redis-om");
const { createClient } = require("redis");

const url = process.env.REDIS_URL;

// const connection = createClient({ url })

// await connection.connect()
const client = new Client().open(url);
// const client = await new Client().use(connection)

module.exports = { client };
