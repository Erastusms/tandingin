const { Entity, Schema } = require('redis-om');

const { client } = require('./client.js');

class Person extends Entity { }

const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' }
});

const personRepository = client.fetchRepository(personSchema);

// await personRepository.createIndex()
module.exports = personRepository;
