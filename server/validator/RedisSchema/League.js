const { Schema } = require("redis-om");

const leagueSchema = new Schema("league", {
  name: { type: "string" },
  description: { type: "text" },
  quota: { type: "number" },
  quotaAvailable: { type: "number" },
}, {
  dataStructure: "JSON"
});

module.exports = { leagueSchema };
