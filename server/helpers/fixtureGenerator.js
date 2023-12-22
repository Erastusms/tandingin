const randomstring = require("randomstring");

const generateFixture = (array, LeagueId) => {
    const fixtureArray = [];
    let matches = {}
    let k = 0
    for (let day = 0; day < array.length; day++) {
        for (let j = 0; j < array[day].length; j++) {
            // matches.id = randomstring.generate(36);
            matches.name = `MatchDay ${day + 1 + k}`
            matches.teamA = array[day][j][0]
            matches.teamB = array[day][j][1]
            matches.LeagueId = LeagueId
            fixtureArray.push(matches)
            matches = {}
            k++;
        }
        k--;
    }
    return fixtureArray
}

module.exports = {
    generateFixture
}